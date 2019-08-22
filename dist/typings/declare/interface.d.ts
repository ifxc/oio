import { AnyPlainObj, RequestMethod, ResponseType } from './type';
interface Request {
    url: string;
    method: RequestMethod;
    headers: {
        'Content-Type'?: string;
        Accept?: string;
        [prop: string]: any;
    };
    params: AnyPlainObj;
    paramsSerializer: ((params: AnyPlainObj) => string) | null;
    data: string | Document | BodyInit | null | AnyPlainObj;
    timeout: number;
    withCredentials: boolean;
    auth: {
        username: string;
        password: string;
    } | null;
    responseType: ResponseType;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    onDownloadProgress: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    onUploadProgress: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    [prop: string]: any;
}
interface Response {
    data: AnyPlainObj | null;
    status: number;
    statusText: string;
    headers: AnyPlainObj | null;
    request: Request | null;
}
interface XHRRequest {
    request(request: (Request | AnyPlainObj)): Promise<Response>;
    request(url: string, request: (Request | AnyPlainObj)): Promise<Response>;
    'delete'(url: string, config?: Request | AnyPlainObj): Promise<Response>;
    'get'(url: string, config?: Request | AnyPlainObj): Promise<Response>;
    head(url: string, config?: Request | AnyPlainObj): Promise<Response>;
    options(url: string, config?: Request | AnyPlainObj): Promise<Response>;
    post(url: string, data: any, config?: Request | AnyPlainObj): Promise<Response>;
    put(url: string, data: any, config?: Request | AnyPlainObj): Promise<Response>;
    patch(url: string, data: any, config?: Request | AnyPlainObj): Promise<Response>;
}
export { Request, Response, XHRRequest };
