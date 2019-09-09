# oio
Powerful and flexible browser Http client, focusing on browser，inspired by Axios and koa-compose

<p>
  <a href="https://www.npmjs.com/package/oiojs"><img src="https://img.shields.io/npm/dw/oiojs" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/oiojs"><img src="https://img.shields.io/npm/v/oiojs" alt="Version"></a>
  <a href="https://www.npmjs.com/package/oiojs"><img src="https://img.shields.io/npm/l/oiojs" alt="License"></a>
</p>

[中文文档](https://github.com/ifxc/oio/blob/master/docs/README-zh.md)

## Features
* Base Methods and configurations of Axios are compatible, but the node.js request module is removed
* Middleware make business processing easier, such as transforming data for requests and responses
* Smaller and more flexible, only 4.6kb(min + gzip)
* Typescript and Promise support


## Install
use npm:
```
npm install oiojs
```


## Example 
### Simple example
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

### Post request
```javascript
import oiojs from 'oiojs';
const oio = new oiojs();
// oio.setCtxData({});
const ctx = oio.newCtx();
ctx.setReq({ url: '/', method: 'post', data: {}, params: {} }).run().then(response => console.log(response));
// or 
// ctx.setUrl(url).setMethod('post').setData(data).setParam(params).run().then(response => console.log(response));
```

### Use XHR alone for simple requests
```javascript
import xhr from 'oiojs/dist/xhr.umd';
// or typescript entry
// import xhr from 'oiojs/src/adapter/xhr';

xhr.get('/').then(response => console.log(response));
xhr.request({ url: '/' }).then(response => console.log(response));
// more methods: delete、head、options、post、put、patch
```

### Use urlencoded format
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

### Processing Business with Middleware
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


### Cancel the request
wait...!


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
