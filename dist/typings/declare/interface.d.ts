import { AnyPlainObj, RequestParam, RequestMethod, ResponseType, ParamsSerializerCallback, RequestData, XhrSendBody } from './types';
export interface RequestConfig {
    url?: string;
    method?: RequestMethod;
    headers?: {
        'Content-Type'?: string;
        Accept?: string;
    } & AnyPlainObj;
    params?: RequestParam;
    paramsSerializer?: ParamsSerializerCallback;
    data?: RequestData;
    timeout?: number;
    withCredentials?: boolean;
    auth?: {
        username: string;
        password: string;
    };
    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onDownloadProgress?: (ev: ProgressEvent) => void;
    onUploadProgress?: (ev: ProgressEvent) => void;
    cancelToken?: (cancel: () => void) => void;
    [prop: string]: any;
}
export interface Request extends RequestConfig {
    url: string;
    method: RequestMethod;
    headers: {
        'Content-Type': string;
        Accept: string;
    } & AnyPlainObj;
    timeout: number;
    data?: XhrSendBody;
}
export interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: AnyPlainObj | null;
    request: Request | null;
}
export interface XHRRequest {
    request(request: RequestConfig): Promise<Response>;
    request(url: string, request: RequestConfig): Promise<Response>;
    'delete'(url: string, config?: RequestConfig): Promise<Response>;
    'get'(url: string, config?: RequestConfig): Promise<Response>;
    head(url: string, config?: RequestConfig): Promise<Response>;
    options(url: string, config?: RequestConfig): Promise<Response>;
    post(url: string, data: any, config?: RequestConfig): Promise<Response>;
    put(url: string, data: any, config?: RequestConfig): Promise<Response>;
    patch(url: string, data: any, config?: RequestConfig): Promise<Response>;
}
export interface ApiError extends Error {
    code: string;
    request?: Request;
    response?: Response;
    isApiError: boolean;
    toJSON?: Function;
}
