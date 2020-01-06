import { AnyPlainObj, FnNext, CtxData, RequestParam, RequestMethod, RequestData } from '../declare/types'
import { RequestConfig, Request, Response, XHRRequest } from '../declare/interface'

import { deepMerge, merge } from '../helpers/utils'

import request from '../data/request'
import response from '../data/response'
import compose from './compose'
import Event from '../helpers/event'
import createError from '../helpers/create-error'

export default class Context {
  // The XHR is default for ajax request
  static XHR: XHRRequest | null = null

  // Event System
  static Event = Event

  // Define default request data config
  protected static $Request = request

  // Define default response data structure
  protected static $Response = response

  // Used to isolate from default request
  static newReq () : Request {
    return <Request>deepMerge({}, Context.$Request)
  }

  // Used to isolate from default response
  static newRes () : Response<any> {
    return <Response<any>>deepMerge({}, Context.$Response)
  }

  // Storage context data，This context`s data is for middleware use
  protected $data: CtxData = {}

  // request config data
  protected request: RequestConfig

  // response data
  protected response: Response<any>

  // The extend mainly stores references to third-party libraries
  extend: AnyPlainObj = {}

  // The default is XHR for ajax request, If there is no ajax, the oio runs with an error
  xhr: XHRRequest | null = null

  // Storage middleware function
  protected middleware: FnNext<Context>[] = []

  // Ignore middleware name list
  protected ignoreMiddlewareFunctionNames: string[] = []

  /**
   * @param {Request} Request config
   * @param {CtxData} Context data，This context`s data is for middleware use
   * @param extend The extend mainly stores references to third-party libraries
   */
  constructor (request?: RequestConfig, data: CtxData = {}, extend?: { xhr?: XHRRequest } & AnyPlainObj) {
    this.$data = merge(this.$data, data)
    if (extend) {
      this.extend = extend
      if (extend.xhr) {
        Context.XHR = this.xhr = extend.xhr
      }
    }
    this.request = <RequestConfig>deepMerge(Context.newReq(), request || {})
    this.response = Context.newRes()
  }

  /**
   * Create api error for unify
   */
  createApiError = createError

  /**
   * Add ignore middleware name
   * @param fnNames
   */
  setIgnoreMiddleware (fnNames: string[]) : Context {
    this.ignoreMiddlewareFunctionNames = fnNames
    return this
  }

  /**
   * Assert whether middleware is ignored
   * @param name
   */
  assertIgnoreMiddleware (name: string) : boolean {
    return this.ignoreMiddlewareFunctionNames.indexOf(name) > -1
  }
  /**
   * Add a middleware
   * @param {FnNext<Context>}
   */
  use (fn: FnNext<Context>) {
    this.middleware.push(fn)
  }

  /**
   * Run middleware
   * @param {FnNext<Context>}
   * @returns {Promise<Response>}
   */
  run (next?: FnNext<Context>) : Promise<Response<any>> {
    const middleware = this.middleware.filter(fn => !this.assertIgnoreMiddleware(fn.name))
    const fn = compose([
      function getResponseMiddleware (ctx, next) {
        return next().then(() => ctx.getRes())
      },
      ...middleware
    ])
    return fn(this, next || function requestMiddleware (ctx, next) {
      const request = ctx.getReq()
      if (ctx.xhr && ctx.xhr.request) {
        return ctx.xhr.request(request)
          .then((response: Response<any>) => ctx.setRes(response))
      }
      return Promise.reject(createError('context`xhr no found', 'CONTEXT_XHR_NOT_FOUND', request))
    })
  }

  /**
   * Create a new context object for each ajax request
   * @returns {Context} return context, but add $data、request、response attribute in new context
   */
  newCtx () : Context {
    const ctx = Object.create(this)
    ctx.$data = {}
    ctx.request = {}
    ctx.response = Context.newRes()
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
  setReq (request: RequestConfig) : Context {
    this.request = <RequestConfig>deepMerge(this.request || {}, request)
    return this
  }

  /**
   * Getting the request in current context
   * The request deep merged request of the parent objects
   * @returns {Request}
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
  setRes (response: Response<any> | AnyPlainObj) : Context {
    this.response = <Response<any>>merge(this.response, response)
    return this
  }

  /**
   * Getting the response in current context
   * @returns {Response}
   */
  getRes () : Response<any> {
    return <Response<any>>deepMerge({}, this.response)
  }

  /**
   * Setting the url in current context`s request url
   * @param {String} request url
   * @returns {Context}
   */
  setUrl (url: string) : Context {
    this.request.url = url
    return this
  }

  /**
   * Setting the method in current context`s request`s method
   * @param {String} delete、get、head、options、post、put、patch
   * @returns {Context}
   */
  setMethod (method: RequestMethod) : Context {
    this.request.method = method
    return this
  }

  /**
   * Setting the data in current context`s request data
   * @param {RequestData} plain object, string | Document | ArrayBuffer | ArrayBufferView |
   *        URLSearchParams | FormData | File | Blob | ReadableStream<Uint8Array> | null | undefined
   * @returns {Context}
   */
  setData (data: RequestData) : Context {
    this.request.data = data
    return this
  }

  /**
   * Setting the params in current context`s request params
   * @param {RequestParam}  AnyPlainObj | URLSearchParams
   * @returns {Context}
   */
  setParams (params: RequestParam) : Context {
    this.request.params = params
    return this
  }

  /**
   * Setting the headers in current context`s request headers
   * @param {AnyPlainObj} headers object
   * @returns {Context}
   */
  setHeaders (headers: AnyPlainObj) : Context {
    this.request.headers = merge(this.request.headers || {}, headers)
    return this
  }
}
