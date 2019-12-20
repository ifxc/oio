import { AnyPlainObj, FnNext, CtxData, RequestParam, RequestMethod, RequestData } from '../declare/types';
import { RequestConfig, Request, Response, XHRRequest } from '../declare/interface';
import Event from '../helpers/event';
import createError from '../helpers/create-error';
export default class Context {
    static XHR: XHRRequest | null;
    static Event: typeof Event;
    protected static $Request: Request;
    protected static $Response: Response;
    static newReq(): Request;
    static newRes(): Response;
    protected $data: CtxData;
    protected request: RequestConfig;
    protected response: Response;
    extend: AnyPlainObj;
    xhr: XHRRequest | null;
    protected middleware: FnNext<Context>[];
    protected ignoreMiddlewareFunctionNames: string[];
    /**
     * @param {Request} Request config
     * @param {CtxData} Context data，This context`s data is for middleware use
     * @param extend The extend mainly stores references to third-party libraries
     */
    constructor(request?: RequestConfig, data?: CtxData, extend?: {
        xhr?: XHRRequest;
    } & AnyPlainObj);
    /**
     * Create api error for unify
     */
    createApiError: typeof createError;
    /**
     * Add ignore middleware name
     * @param fnNames
     */
    setIgnoreMiddleware(fnNames: string[]): Context;
    /**
     * Assert whether middleware is ignored
     * @param name
     */
    assertIgnoreMiddleware(name: string): boolean;
    /**
     * Add a middleware
     * @param {FnNext<Context>}
     */
    use(fn: FnNext<Context>): void;
    /**
     * Run middleware
     * @param {FnNext<Context>}
     * @returns {Promise<Response>}
     */
    run(next?: FnNext<Context>): Promise<Response>;
    /**
     * Create a new context object for each ajax request
     * @returns {Context} return context, but add $data、request、response attribute in new context
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
    setReq(request: RequestConfig): Context;
    /**
     * Getting the request in current context
     * The request deep merged request of the parent objects
     * @returns {Request}
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
     * @returns {Response}
     */
    getRes(): Response;
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
     * @param {RequestData} plain object, string | Document | ArrayBuffer | ArrayBufferView |
     *        URLSearchParams | FormData | File | Blob | ReadableStream<Uint8Array> | null | undefined
     * @returns {Context}
     */
    setData(data: RequestData): Context;
    /**
     * Setting the params in current context`s request params
     * @param {RequestParam}  AnyPlainObj | URLSearchParams
     * @returns {Context}
     */
    setParams(params: RequestParam): Context;
    /**
     * Setting the headers in current context`s request headers
     * @param {AnyPlainObj} headers object
     * @returns {Context}
     */
    setHeaders(headers: AnyPlainObj): Context;
}
