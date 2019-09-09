import { AnyPlainObj, FnNext, CtxData, RequestMethod, RequestBody } from '../declare/type';
import { Request, Response, XHRRequest } from '../declare/interface';
export default class Context {
    static XHR: XHRRequest | null;
    protected static $Request: Request;
    protected static $Response: {
        data: null;
        status: number;
        statusText: string;
        headers: {};
        request: null;
    };
    static newReq(): Request;
    static newRes(): Response;
    parent: Context;
    $data: CtxData;
    request: Request;
    response: Response;
    extend: AnyPlainObj;
    ajax: XHRRequest;
    protected middleware: FnNext<any>[];
    /**
     * @param {Request} Request config
     * @param {CtxData} Context data，This context`s data is for middleware use
     * @param extend The extend mainly stores references to third-party libraries
     */
    constructor(request?: Request | AnyPlainObj, data?: CtxData, extend?: {
        ajax?: XHRRequest;
        [prop: string]: any;
    });
    /**
     * Add a middleware
     * @param {FnNext<any>}
     */
    use(fn: FnNext<any>): void;
    /**
     * Run middleware
     * @param {FnNext<any>}
     * @returns {Promise<Response>}
     */
    run(next?: FnNext<any>): Promise<Response>;
    /**
     * Create a new context object for each ajax request
     * @returns {Context} return context, but add $data、request、response、parent attribute in new context
     */
    newCtx(): Context;
    /**
     * Setting the context data in the current context
     * This context`s data is for middleware use
     * @param data
     * @returns {Context}
     */
    setCtxData(data: CtxData): Context;
    /**
     * Get the context`s data in the current context
     * @returns {CtxData}
     */
    getCtxData(): CtxData;
    /**
     * Setting the request in current context and deep merged request
     * @param {Request|AnyPlainObj} request config
     * @returns {Context}
     */
    setReq(request: Request | AnyPlainObj): Context;
    /**
     * Getting the request in current context
     * The request deep merged request of the parent objects
     * @returns {Request | null}
     */
    getReq(): Request;
    /**
     * Setting the response in current context
     * @param {Response|AnyPlainObj} response data
     * @returns {Context}
     */
    setRes(response: Response | AnyPlainObj): Context;
    /**
     * Getting the response in current context
     * @returns {Response | AnyPlainObj}
     */
    getRes(): Response | AnyPlainObj;
    /**
     * Setting the url in current context`s request url
     * @param {String} request url
     * @returns {Context}
     */
    setUrl(url: string): Context;
    /**
     * Setting the method in current context`s request`s method
     * @param {String} delete、get、head、options、post、put、patch
     * @returns {Context}
     */
    setMethod(method: RequestMethod): Context;
    /**
     * Setting the data in current context`s request data
     * @param {RequestBody} string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams, FormData, File, Blob
     * @returns {Context}
     */
    setData(data: RequestBody): Context;
    /**
     * Setting the params in current context`s request params
     * @param {AnyPlainObj} plain object for params
     * @returns {Context}
     */
    setParams(params: AnyPlainObj): Context;
    /**
     * Setting the headers in current context`s request headers
     * @param {AnyPlainObj} headers object
     * @returns {Context}
     */
    setHeaders(headers: AnyPlainObj): Context;
}
