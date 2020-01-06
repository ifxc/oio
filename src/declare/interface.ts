
import { AnyPlainObj, RequestParam, RequestMethod, ResponseType,
  ParamsSerializerCallback, RequestData, XhrSendBody } from './types'

export interface RequestConfig {
  // `url` is the server URL that will be used for the request
  url?: string,

  // `method` is the request method to be used when making the request
  method?: RequestMethod, // default

  // `headers` are custom headers to be sent
  headers?: {
    'Content-Type'?: string,
    Accept?: string
  } & AnyPlainObj,

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params?: RequestParam,

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  // Qs.stringify(params, {arrayFormat: 'brackets'})
  paramsSerializer?: ParamsSerializerCallback,
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  data?: RequestData,

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout?: number, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials?: boolean, // default

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  // Please note that only HTTP Basic auth is configurable through this parameter.
  // For Bearer tokens and such, use `Authorization` custom headers instead.
  auth?: {
    username: string,
    password: string
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType?: ResponseType, // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName?: string, // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName?: string, // default
  // event
  onDownloadProgress?: (ev: ProgressEvent) => void,
  onUploadProgress?: (ev: ProgressEvent) => void,
  // xhr abort, cancel is abort callback
  cancelToken?: (cancel: () => void) => void,
  [prop: string]: any
}

export interface Request extends RequestConfig {
  url: string,
  method: RequestMethod,
  headers: {
    'Content-Type': string,
    Accept: string
  } & AnyPlainObj,
  timeout: number,
  data?: XhrSendBody
}

export interface Response<T> {
  // `data` is the response that was provided by the server
  data: T,

  // `status` is the HTTP status code from the server response
  status: number,

  // `statusText` is the HTTP status message from the server response
  statusText: string,

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: AnyPlainObj | null,

  request: Request | null
}

export interface XHRRequest {
  request (request: RequestConfig) : Promise<Response<any>>,
  request (url: string, request: RequestConfig) : Promise<Response<any>>,
  'delete' (url: string, config?: RequestConfig) : Promise<Response<any>>,
  'get' (url: string, config?: RequestConfig) : Promise<Response<any>>,
  head (url: string, config?: RequestConfig) : Promise<Response<any>>,
  options (url: string, config?: RequestConfig) : Promise<Response<any>>,
  post (url: string, data: any, config?: RequestConfig) : Promise<Response<any>>,
  put (url: string, data: any, config?: RequestConfig) : Promise<Response<any>>,
  patch (url: string, data: any, config?: RequestConfig) : Promise<Response<any>>
}

export interface ApiError extends Error {
  code: string,
  request?: Request,
  response?: Response<any>,
  isApiError: boolean,
  toJSON?: Function
}
