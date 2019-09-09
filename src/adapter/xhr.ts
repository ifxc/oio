import { RequestMethodNoData, RequestMethodWithData } from '../declare/enum'
import { Request, Response, XHRRequest } from '../declare/interface'
import { forEach, merge } from '../helpers/utils'
import { isArrayBuffer, isArrayBufferView, isURLSearchParams, isObject,
  isFormData, isStream, isFile, isBlob } from '../helpers/is'
import dispatchRequest from './xhrAdapter'
import requestDefault from '../data/request'

const XHR: XHRRequest = <XHRRequest>{
  request: function (request: any) {
    if (typeof request === 'string') {
      request = arguments[1] || {}
      request.url = arguments[0]
    } else {
      request = request || {}
    }
    request = merge(requestDefault, request)

    const isPass = isFormData(request.data) || isArrayBuffer(request.data) ||
      isStream(request.data) || isFile(request.data) || isBlob(request.data)

    if (isArrayBufferView(request.data)) {
      request.data = request.buffer
    }
    if (isURLSearchParams(request.data)) {
      if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      }
      request.data = request.data.toString()
    }
    if (!isPass && isObject(request.data)) {
      if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/json;charset=utf-8'
      }
      request.data = JSON.stringify(request.data)
    }

    return dispatchRequest(request).then((response: Response) => {
      // default json
      if (typeof response.data === 'string') {
        try {
          response.data = JSON.parse(response.data)
        } catch (e) { /* Ignore */ }
      }
      return response
    })
  }
}

forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData (method: RequestMethodNoData) {
  XHR[method] = function (url: string, config: Request) : Promise<Response> {
    return this.request(merge(config || {}, {
      method: method,
      url: url
    }))
  }
})

forEach(['post', 'put', 'patch'], function forEachMethodWithData (method: RequestMethodWithData) {
  XHR[method] = function (url: string, data: any, config: Request) : Promise<Response> {
    return this.request(merge(config || {}, {
      method: method,
      url: url,
      data: data
    }))
  }
})

export default XHR
