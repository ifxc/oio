import { AnyPlainObj, FnNext, CtxData, RequestMethod, RequestBody } from '../declare/type'
import { Request, Response, XHRRequest } from '../declare/interface'

import { deepMerge, merge } from '../helpers/utils'

import request from '../data/request'
import response from '../data/response'
import compose from './compose'
import Event from '../helpers/event'
import createError from '../helpers/create-error'

export default class Context {
  // The XHR is default for ajax request
  static XHR: XHRRequest | null

  // Define default request data config
  protected static $Request = request

  // Define default response data structure
  protected static $Response = response

  // Used to isolate from default request
  static newReq () : Request {
    return <Request>deepMerge({}, Context.$Request)
  }

  // Used to isolate from default response
  static newRes () : Response {
    return <Response>deepMerge({}, Context.$Response)
  }

  // Point to the context parent object
  // If it's root, it's self
  parent: Context

  // Storage context data，This context`s data is for middleware use
  $data: CtxData = {}

  // request config data
  request: Request

  // response data
  response: Response

  // The extend mainly stores references to third-party libraries
  extend: AnyPlainObj = {}

  // The default is XHR for ajax request, If there is no ajax, the oio runs with an error
  ajax: XHRRequest

  // Storage middleware function
  protected middleware: FnNext<any>[] = []

  /**
   * @param {Request} Request config
   * @param {CtxData} Context data，This context`s data is for middleware use
   * @param extend The extend mainly stores references to third-party libraries
   */
  constructor (request?: Request | AnyPlainObj, data?: CtxData, extend?: { ajax?: XHRRequest, [prop: string]: any }) {
    if (data) {
      this.$data = merge(this.$data, data)
    }
    if (extend) {
      this.extend = extend
    }
    if (this.extend.ajax) {
      Context.XHR = this.ajax = this.extend.ajax
    } else {
      Context.XHR = this.ajax = <any>{}
    }
    this.request = <Request>deepMerge(Context.newReq(), request || {})
    this.response = Context.newRes()
    this.parent = this
  }

  /**
   * Add a middleware
   * @param {FnNext<any>}
   */
  use (fn: FnNext<any>) {
    this.middleware.push(fn)
  }

  /**
   * Run middleware
   * @param {FnNext<any>}
   * @returns {Promise<Response>}
   */
  run (next?: FnNext<any>) : Promise<Response> {
    const fn = compose([
      function getResponse (ctx, next) {
        return next().then(() => ctx.getRes())
      },
      ...this.middleware
    ])
    return fn(this, next || function request (ctx, next) {
      if (ctx.ajax && ctx.ajax.request) {
        return ctx.ajax.request(ctx.getReq() || {})
          .then((response: Response) => ctx.setRes(response))
      }
      return Promise.reject(createError('Network Error', <Request>ctx.request, null))
    })
  }

  /**
   * Create a new context object for each ajax request
   * @returns {Context} return context, but add $data、request、response、parent attribute in new context
   */
  newCtx () : Context {
    const ctx = Object.create(this)
    ctx.$data = {}
    ctx.request = {}
    ctx.response = {}
    ctx.parent = this
    return ctx
  }

  /**
   * Setting the context data in the current context
   * This context`s data is for middleware use
   * @param data
   * @returns {Context}
   */
  setCtxData (data: CtxData) : Context {
    this.$data = merge(this.$data, data)
    return this
  }

  /**
   * Get the context`s data in the current context
   * @returns {CtxData}
   */
  getCtxData () : CtxData {
    return this.$data
  }

  /**
   * Setting the request in current context and deep merged request
   * @param {Request|AnyPlainObj} request config
   * @returns {Context}
   */
  setReq (request: Request | AnyPlainObj) : Context {
    this.request = <Request>deepMerge(this.request || {}, request)
    return this
  }

  /**
   * Getting the request in current context
   * The request deep merged request of the parent objects
   * @returns {Request | null}
   */
  getReq () : Request {
    const requests: any[] = []
    function findReq (instance: Context) {
      const obj = Object.getPrototypeOf(instance)
      if (!obj || !obj.request) return
      requests.push(obj.request)
      findReq(obj)
    }
    findReq(this)
    return <Request>deepMerge({}, ...requests.reverse(), this.request)
  }

  /**
   * Setting the response in current context
   * @param {Response|AnyPlainObj} response data
   * @returns {Context}
   */
  setRes (response: Response | AnyPlainObj) : Context {
    this.response = <Response>merge(this.response, response)
    return this
  }

  /**
   * Getting the response in current context
   * @returns {Response | AnyPlainObj}
   */
  getRes () : Response | AnyPlainObj {
    return deepMerge({}, this.response)
  }

  /**
   * Setting the url in current context`s request url
   * @param {String} request url
   * @returns {Context}
   */
  setUrl (url: string) : Context {
    if (this.request) {
      this.request.url = url
    } else {
      this.request = <Request>{ url }
    }
    return this
  }

  /**
   * Setting the method in current context`s request`s method
   * @param {String} delete、get、head、options、post、put、patch
   * @returns {Context}
   */
  setMethod (method: RequestMethod) : Context {
    if (this.request) {
      this.request.method = method
    } else {
      this.request = <Request>{ method }
    }
    return this
  }

  /**
   * Setting the data in current context`s request data
   * @param {RequestBody} string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams, FormData, File, Blob
   * @returns {Context}
   */
  setData (data: RequestBody) : Context {
    if (this.request) {
      this.request.data = data
    } else {
      this.request = <Request>{ data }
    }
    return this
  }

  /**
   * Setting the params in current context`s request params
   * @param {AnyPlainObj} plain object for params
   * @returns {Context}
   */
  setParams (params: AnyPlainObj) : Context {
    if (this.request) {
      this.request.params = params
    } else {
      this.request = <Request>{ params }
    }
    return this
  }

  /**
   * Setting the headers in current context`s request headers
   * @param {AnyPlainObj} headers object
   * @returns {Context}
   */
  setHeaders (headers: AnyPlainObj) : Context {
    if (this.request) {
      this.request.headers = <AnyPlainObj>merge(this.request.headers, headers)
    } else {
      this.request = <Request>{ headers }
    }
    return this
  }
}
