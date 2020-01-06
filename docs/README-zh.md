# oio
强大灵活的浏览器Http客户端，专注于浏览器实现，灵感来自于axios和koa-compose

<p>
  <a href="https://www.npmjs.com/package/oiojs"><img src="https://img.shields.io/npm/dw/oiojs" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/oiojs"><img src="https://img.shields.io/npm/v/oiojs" alt="Version"></a>
  <a href="https://www.npmjs.com/package/oiojs"><img src="https://img.shields.io/npm/l/oiojs" alt="License"></a>
</p>

## 特性
* 兼容了axios的大部分方法和配置，但去掉了node.js请求模块
* 中间件机制使业务处理更容易，比如转换请求和响应数据
* 更小更灵活，min+gzip下只有5kb左右
* Typescript和Promise的支持


## 安装
use npm:
```
npm install oiojs
```


## 案例
### 简单案例
```javascript
import oiojs from 'oiojs';
const oio = new oiojs();
oio.setUrl('/').run().then(response => {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.request);
});
```

### post请求
```javascript
import oiojs from 'oiojs';
const oio = new oiojs();
// oio.setCtxData({});
const ctx = oio.newCtx();
ctx.setReq({ url: '/', method: 'post', data: {}, params: {} }).run().then(response => console.log(response));
// or 
// ctx.setUrl(url).setMethod('post').setData(data).setParam(params).run().then(response => console.log(response));
```

### 单独使用XHR，适合简单请求
```javascript
import xhr from 'oiojs/dist/xhr.umd';
// or typescript entry
// import xhr from 'oiojs/src/adapter/xhr';

xhr.get('/').then(response => console.log(response));
xhr.request({ url: '/' }).then(response => console.log(response));
// more methods: delete、head、options、post、put、patch
```

### 用urlencoded格式
```javascript
import oiojs from 'oiojs';
const oio = new oiojs();
const ctx = oio.newCtx();
const data = new URLSearchParams();
data.append('param1', 'value1');
ctx.setReq({
  url: '/',
  data: data,
  method: 'post',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).run().then(response => console.log(response));
```

### 用中间件处理业务
```javascript
import oiojs from 'oiojs';
const oio = new oiojs();
// Add middleware
oio.use(async function intercept(ctx, next) {
  const { request, response } = ctx.getCtxData();
  // handler intercept request, for example:
  if (request && !request.data) throw new Error('No Data');
  await next();
  // handler intercept response, for example:
  if (response && response.status === 500) throw new Error('Server Error');
});
oio.use(async function transform(ctx, next) {
  const { request, response } = ctx.getCtxData();
  // handler request data
  await next();
  // handler response data
});
const ctx = oio.newCtx();
ctx.setUrl('https://easy-mock.com/mock/5d567ba461a1c429de63dbc8/api/oio').setData({}).run().then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
});
```
🔥 🔥 🔥  **[example](https://github.com/ifxc/oio/blob/master/example/index.js)**


## Oio Api
Oio extends from Context, But set ajax request to XHR by default
```typescript
type Extend = { xhr?: XHRRequest } & AnyPlainObj

export default class OiO extends Context {
  constructor (request?: RequestConfig, data?: CtxData, extend?: Extend) {
    super(request || {}, data || {}, merge({ xhr: XHR }, extend || {}))
  }
}
```
```typescript
export default class Context {
  // The XHR is default for ajax request
  static XHR: XHRRequest | null
  
  static Event: Event

  // Define default request data config
  protected static $Request: RequestCOnfig

  // Define default response data structure
  protected static $Response: Response<any>

  // Used to isolate from default request
  static newReq () : Request

  // Used to isolate from default response
  static newRes () : Response<any>

  // Storage context data，This context`s data is for middleware use
  protected $data: CtxData

  // request config data
  protected request: RequestConfig

  // response data
  protected response: Response<any>

  // The extend mainly stores references to third-party libraries
  extend: AnyPlainObj

  // The default is XHR for ajax request, If there is no ajax, the oio runs with an error
  xhr: XHRRequest

  // Storage middleware function
  protected middleware: FnNext<Context>[]
  
  // Ignore middleware name list
  protected ignoreMiddlewareFunctionNames: string[]

  /**
   * @param {Request} Request config
   * @param {CtxData} Context data，This context`s data is for middleware use
   * @param extend The extend mainly stores references to third-party libraries
   */
  constructor (request?: RequestConfigj, data?: CtxData, extend?: { xhr?: XHRRequest } & AnyPlainObj)

  /**
   * Create api error for unify
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  createApiError (message: string, code: string = '', request: Request, response?: Response<any>) : ApiError
  
  /**
   * Add ignore middleware name
   * @param fnNames
   */
  setIgnoreMiddleware (fnNames: string[]) : Context
  
  /**
   * Assert whether middleware is ignored
   * @param name
   */
  assertIgnoreMiddleware (name: string) : boolean
    
  /**
   * Add a middleware
   * @param {FnNext<Context>}
   */
  use (fn: FnNext<any>)

  /**
   * Run middleware
   * @param {FnNext<Context>}
   * @returns {Promise<Response<any>>}
   */
  run (next?: FnNext<any>) : Promise<Response<any>>

  /**
   * Create a new context object for each ajax request
   * @returns {Context} return context, but add $data、request、response、parent attribute in new context
   */
  newCtx () : Context

  /**
   * Setting the context data in the current context
   * This context`s data is for middleware use
   * @param data
   * @returns {Context}
   */
  setCtxData (data: CtxData) : Context

  /**
   * Get the context`s data in the current context
   * @returns {CtxData}
   */
  getCtxData () : CtxData

  /**
   * Setting the request in current context and deep merged request
   * @param {RequestConfig} request config
   * @returns {Context}
   */
  setReq (request: RequestConfigj) : Context

  /**
   * Getting the request in current context
   * The request deep merged request of the parent objects
   * @returns {Request}
   */
  getReq () : Request

  /**
   * Setting the response in current context
   * @param {Response<any>|AnyPlainObj} response data
   * @returns {Context}
   */
  setRes (response: Response<any> | AnyPlainObj) : Context

  /**
   * Getting the response in current context
   * @returns {Response<any>}
   */
  getRes () : Response<any>

  /**
   * Setting the url in current context`s request url
   * @param {String} request url
   * @returns {Context}
   */
  setUrl (url: string) : Context

  /**
   * Setting the method in current context`s request`s method
   * @param {String} delete、get、head、options、post、put、patch
   * @returns {Context}
   */
  setMethod (method: RequestMethod) : Context

  /**
   * Setting the data in current context`s request data
   * @param {RequestData} plain object, string | Document | ArrayBuffer | ArrayBufferView |
   *        URLSearchParams | FormData | File | Blob | ReadableStream<Uint8Array> | null | undefined
   * @returns {Context}
   */
  setData (data: RequestData) : Context

  /**
   * Setting the params in current context`s request params
   * @param {AnyPlainObj} plain object for params
   * @returns {Context}
   */
  setParams (params: RequestParam) : Context
  /**
   * Setting the headers in current context`s request headers
   * @param {AnyPlainObj} headers object
   * @returns {Context}
   */
  setHeaders (headers: AnyPlainObj) : Context
  
```


## XHR Api
XHR.request(config)

XHR.get(url[, request])

XHR.delete(url[, config])

XHR.head(url[, config])

XHR.options(url[, config])

XHR.post(url[, data[, config]])

XHR.put(url[, data[, config]])

XHR.patch(url[, data[, config]])


## Request default config
```
{
  // `url` is the server URL that will be used for the request
  url: '',
  
  // `method` is the request method to be used when making the request
  method: 'get',
  
  // `headers` are custom headers to be sent
  headers: {
    'Content-Type': '', // default object => json、URLSearchParams => urlencoded
    'Accept': 'application/json, text/plain, */*'
  },
  
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: null,
  
  // `paramsSerializer` is an optional function in charge of serializing `params`
  paramsSerializer: null,
  
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams，FormData, File, Blob
  data: null,
  
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 0,
  
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  withCredentials: false,
  
  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, For Example { username: 'user', password: '123456' }.
  auth: null,
  
  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream', 'blob'
  responseType: 'json',
  
  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN',
  
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN',
  
  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: null,
  
  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: null
  
  // xhr abort, cancel is abort callback
  cancelToken: null,
```


## Response Schema
```
interface Response<T> {
  // `data` is the response that was provided by the server
  data: T,

  // `status` is the HTTP status code from the server response
  status: number,

  // `statusText` is the HTTP status message from the server response
  statusText: string,

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: AnyPlainObj | null,

  // request data
  request: Request | null
}
```


## Project develop
### test
```
npm run test:unit
```

### build
```
npm run build
```


## Changelog
### 1.0.6 (2019.12.20)
* 为RequestConfig添加cancelToken配置，提供请求后取消的功能
* 上下文添加忽略中间件的方法，方便更好地控制请求过程中需要运行的中间件
* 优化代码和修复bug

### 1.0.1 (2019.8.21)
* 初次提交


## License
MIT
