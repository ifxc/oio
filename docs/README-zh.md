# oio
强大灵活的浏览器Http客户端，专注于浏览器实现，灵感来自于axios和koa-compose


## 特性
* 兼容了axios的大部分方法和配置，但去掉了node.js请求模块
* 中间件机制使业务处理更容易，比如转换请求和响应数据
* 更小更灵活，min+gzip下只有4.6kb
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

### 🔥 用中间件处理业务
**[example](https://github.com/ifxc/oio/blob/master/example/index.js)**


### 中途取消请求
待实现


## Oio Api
Oio extends from Context, But set ajax request to XHR by default
```javascript
class Oio extends Context {
  constructor (request?: Request | AnyPlainObj, data?: CtxData, extend?: Extend) {
    super(request || {}, data || {}, merge({ ajax: XHR }, extend || {}))
  }
}
```
```javascript
export default class Context {
  // The XHR is default for ajax request
  static XHR: XHRRequest

  // Define default request data config
  protected static $Request

  // Define default response data structure
  protected static $Response

  // Used to isolate from default request
  static newReq () : Request

  // Used to isolate from default response
  static newRes () : Response

  // Point to the context parent object
  // If it's root, it's self
  parent: Context

  // Storage context data，This context`s data is for middleware use
  $data: CtxData

  // request config data
  request: Request

  // response data
  response: Response

  // The extend mainly stores references to third-party libraries
  extend: AnyPlainObj

  // The default is XHR for ajax request, If there is no ajax, the oio runs with an error
  ajax: XHRRequest

  // Storage middleware function
  protected middleware: FnNext<any>[]

  /**
   * @param {Request} Request config
   * @param {CtxData} Context data，This context`s data is for middleware use
   * @param extend The extend mainly stores references to third-party libraries
   */
  constructor (request?: Request | AnyPlainObj, data?: CtxData, extend?: { ajax?: XHRRequest, [prop: string]: any })

  /**
   * Add a middleware
   * @param {FnNext<any>}
   */
  use (fn: FnNext<any>)

  /**
   * Run middleware
   * @param {FnNext<any>}
   * @returns {Promise<Response>}
   */
  run (next?: FnNext<any>) : Promise<Response>

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
   * @param {Request|AnyPlainObj} request config
   * @returns {Context}
   */
  setReq (request: Request | AnyPlainObj) : Context

  /**
   * Getting the request in current context
   * The request deep merged request of the parent objects
   * @returns {Request | null}
   */
  getReq () : Request

  /**
   * Setting the response in current context
   * @param {Response|AnyPlainObj} response data
   * @returns {Context}
   */
  setRes (response: Response | AnyPlainObj) : Context

  /**
   * Getting the response in current context
   * @returns {Response | AnyPlainObj}
   */
  getRes () : Response | AnyPlainObj

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
   * @param {RequestBody} string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams, FormData, File, Blob
   * @returns {Context}
   */
  setData (data: RequestBody) : Context

  /**
   * Setting the params in current context`s request params
   * @param {AnyPlainObj} plain object for params
   * @returns {Context}
   */
  setParams (params: AnyPlainObj) : Context
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
  params: {},
  
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
  onDownloadProgress: ev => ev,
  
  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: ev => ev
```


## Response Schema
```
interface Response {
  // `data` is the response that was provided by the server
  data: AnyObj | null,

  // `status` is the HTTP status code from the server response
  status: number,

  // `statusText` is the HTTP status message from the server response
  statusText: string,

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: Header | null,

  // request config
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
### 1.0.1 (2019.8.21)
* Initial release


## License
MIT