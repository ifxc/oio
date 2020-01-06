import { RequestConfig, Request, Response, XHRRequest } from '../declare/interface'
import { RequestData } from '../declare/types'
import { forEach, merge } from '../helpers/utils'
import { isArrayBuffer, isArrayBufferView,
  isURLSearchParams, isObject,
  isFormData, isStream,
  isFile, isBlob, isString } from '../helpers/is'
import dispatchRequest from './xhrAdapter'
import requestDefault from '../data/request'

/**
 * create request method
 */
const XHR: XHRRequest = <XHRRequest>{
  request: function (requestConfig: RequestConfig) : Promise<Response<any>> {
    if (isString(requestConfig)) {
      requestConfig = arguments[1] || {}
      requestConfig.url = arguments[0]
    } else {
      requestConfig = requestConfig || {}
    }
    const request = <RequestConfig>merge(requestDefault, requestConfig)
    if (!request.headers) request.headers = {}

    const isJsonData = !(isFormData(request.data) || isArrayBuffer(request.data) ||
      isStream(request.data) || isFile(request.data) || isBlob(request.data))

    if (isArrayBufferView(request.data)) {
      request.data = request.buffer
    }
    // default form set
    if (isURLSearchParams(request.data)) {
      if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      }
      if (request.data) request.data = request.data.toString()
    }
    // default json set
    if (isJsonData && isObject(request.data)) {
      if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/json;charset=utf-8'
      }
      request.data = JSON.stringify(request.data)
    }

    return dispatchRequest(<Request>request).then((response: Response<any>) => {
      // default parse json
      if (isString(response.data)) {
        try {
          response.data = JSON.parse(<string>response.data)
        } catch (e) { /* Ignore */ }
      }
      return response
    })
  }
}

const enum RequestMethodNoData {
  Delete = 'delete',
  Get = 'get',
  Head = 'head',
  Options = 'options'
}

const enum RequestMethodWithData {
  Post = 'post',
  Put = 'put',
  Patch = 'patch'
}

forEach([
  RequestMethodNoData.Delete,
  RequestMethodNoData.Get,
  RequestMethodNoData.Head,
  RequestMethodNoData.Options
], function forEachMethodNoData (method: RequestMethodNoData) {
  XHR[method] = function (url: string, config?: RequestConfig) : Promise<Response<any>> {
    return this.request(merge(config || {}, {
      method: method,
      url: url
    }))
  }
})

forEach([
  RequestMethodWithData.Post,
  RequestMethodWithData.Put,
  RequestMethodWithData.Patch
], function forEachMethodWithData (method: RequestMethodWithData) {
  XHR[method] = function (url: string, data: RequestData = {}, config?: RequestConfig) : Promise<Response<any>> {
    return this.request(merge(config || {}, {
      method: method,
      url: url,
      data: data
    }))
  }
})

export default XHR
