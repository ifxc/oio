
import { AnyPlainObj, RequestMethod, ResponseType } from './type'

interface Request {
  // `url` is the server URL that will be used for the request
  url: string,

  // `method` is the request method to be used when making the request
  method: RequestMethod, // default

  // `headers` are custom headers to be sent
  headers: {
    'Content-Type'?: string,
    Accept?: string,
    [prop: string]: any
  },

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: AnyPlainObj,

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  // Qs.stringify(params, {arrayFormat: 'brackets'})
  paramsSerializer: ((params: AnyPlainObj) => string) | null,
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  data: string | Document | BodyInit | null | AnyPlainObj,

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: number, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: boolean, // default

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  // Please note that only HTTP Basic auth is configurable through this parameter.
  // For Bearer tokens and such, use `Authorization` custom headers instead.
  auth: {
    username: string,
    password: string
  } | null,

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: ResponseType, // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: string, // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: string, // default
  // event
  onDownloadProgress: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any,
  onUploadProgress: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any,
  [prop: string]: any
}

interface Response {
  // `data` is the response that was provided by the server
  data: AnyPlainObj | null,

  // `status` is the HTTP status code from the server response
  status: number,

  // `statusText` is the HTTP status message from the server response
  statusText: string,

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: AnyPlainObj | null,

  request: Request | null
}

interface XHRRequest {
  request (request: (Request | AnyPlainObj)) : Promise<Response>,
  request (url: string, request: (Request | AnyPlainObj)) : Promise<Response>,
  'delete' (url: string, config?: Request | AnyPlainObj) : Promise<Response>,
  'get' (url: string, config?: Request | AnyPlainObj) : Promise<Response>,
  head (url: string, config?: Request | AnyPlainObj) : Promise<Response>,
  options (url: string, config?: Request | AnyPlainObj) : Promise<Response>,
  post (url: string, data: any, config?: Request | AnyPlainObj) : Promise<Response>,
  put (url: string, data: any, config?: Request | AnyPlainObj) : Promise<Response>,
  patch (url: string, data: any, config?: Request | AnyPlainObj) : Promise<Response>
}

export { Request, Response, XHRRequest }
