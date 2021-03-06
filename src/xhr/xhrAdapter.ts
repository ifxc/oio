
import { AnyPlainObj } from '../declare/types'
import { Request, Response } from '../declare/interface'

import createError from '../helpers/create-error'
import { isFormData, isStandardBrowserEnv, isUndefined, isFunction } from '../helpers/is'
import { forEach } from '../helpers/utils'
import buildURL from '../helpers/build-url'
import parseHeaders from '../helpers/parse-headers'
import isURLSameOrigin from '../helpers/is-url-same-origin'
import cookies from '../helpers/cookies'

export default function xhrAdapter (request: Request) : Promise<Response<any>> {
  return new Promise(function dispatchXhrRequest (resolve, reject) {
    let requestData = request.data
    const requestHeaders = request.headers
    if (isFormData(requestData)) {
      delete requestHeaders['Content-Type'] // Let the browser set it
    }

    let xhr: XMLHttpRequest | null = new XMLHttpRequest()

    // HTTP basic authentication
    if (request.auth) {
      const username = request.auth.username || ''
      const password = request.auth.password || ''
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password)
    }

    xhr.open(request.method.toUpperCase(), buildURL(request.url, request.params, request.paramsSerializer), true)

    // Set the request timeout in MS
    xhr.timeout = request.timeout

    // Listen for ready state
    xhr.onreadystatechange = function handleLoad () {
      if (!xhr) return
      if (!request || xhr.readyState !== 4) {
        return
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (xhr.status === 0 && !(xhr.responseURL && xhr.responseURL.indexOf('file:') === 0)) {
        return
      }

      // Prepare the response
      const responseHeaders: AnyPlainObj | null = 'getAllResponseHeaders' in xhr ? parseHeaders(xhr.getAllResponseHeaders()) : null
      const responseData: AnyPlainObj = !request.responseType || request.responseType === 'text' ? xhr.responseText : xhr.response

      const response: Response<any> = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        request: request
      }

      resolve(response)

      // Clean up request
      xhr = null
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    xhr.onabort = function handleAbort () {
      if (!xhr) {
        return
      }

      reject(createError('Request aborted', 'XHR_ABORTED', request))

      // Clean up request
      xhr = null
    }

    // Handle low level network errors
    xhr.onerror = function handleError () {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('XMLHttpRequest error', 'XHR_ERROR', request))

      // Clean up request
      xhr = null
    }

    // Handle timeout
    xhr.ontimeout = function handleTimeout () {
      reject(createError('timeout of ' + request.timeout + 'ms exceeded', 'ECONNABORTED', request))

      // Clean up request
      xhr = null
    }

    // Handle abort
    // xhr.abort()

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (isStandardBrowserEnv()) {
      // Add xsrf header
      const isAddXsrfHeader = request.withCredentials || isURLSameOrigin(request.url)
      const xsrfValue = isAddXsrfHeader && request.xsrfCookieName ? cookies.read(request.xsrfCookieName) : undefined

      if (xsrfValue && request.xsrfHeaderName) {
        requestHeaders[request.xsrfHeaderName] = xsrfValue
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in xhr) {
      forEach(requestHeaders, function setRequestHeader (val: any, key: string) {
        if ((isUndefined(requestData) || requestData === null) && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key]
        } else {
          // Otherwise add header to the request
          (<XMLHttpRequest>xhr).setRequestHeader(key, val)
        }
      })
    }

    // Add withCredentials to request if needed
    if (request.withCredentials) {
      xhr.withCredentials = true
    }

    // Add responseType to request if needed
    if (request.responseType) {
      try {
        xhr.responseType = request.responseType
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (request.responseType !== 'json') {
          throw e
        }
      }
    }

    // Handle progress if needed
    if (isFunction(request.onDownloadProgress) && request.onDownloadProgress) {
      xhr.addEventListener('progress', request.onDownloadProgress)
    }

    // Not all browsers support upload events
    if (isFunction(request.onUploadProgress) && xhr.upload && request.onUploadProgress) {
      xhr.upload.addEventListener('progress', request.onUploadProgress)
    }

    if (request.cancelToken) {
      // Handle cancellation
      request.cancelToken(function onCanceled () {
        if (!xhr) return
        xhr.abort()
        // Clean up request
        xhr = null
      })
    }

    if (requestData === undefined) {
      requestData = null
    }

    // Send the request
    xhr.send(requestData)
  })
}
