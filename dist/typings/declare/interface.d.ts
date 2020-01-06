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
export interface Response<T> {
    data: T;
    status: number;
    statusText: string;
    headers: AnyPlainObj | null;
    request: Request | null;
}
export interface XHRRequest {
    request(request: RequestConfig): Promise<Response<any>>;
    request(url: string, request: RequestConfig): Promise<Response<any>>;
    'delete'(url: string, config?: RequestConfig): Promise<Response<any>>;
    'get'(url: string, config?: RequestConfig): Promise<Response<any>>;
    head(url: string, config?: RequestConfig): Promise<Response<any>>;
    options(url: string, config?: RequestConfig): Promise<Response<any>>;
    post(url: string, data: any, config?: RequestConfig): Promise<Response<any>>;
    put(url: string, data: any, config?: RequestConfig): Promise<Response<any>>;
    patch(url: string, data: any, config?: RequestConfig): Promise<Response<any>>;
}
export interface ApiError extends Error {
    code: string;
    request?: Request;
    response?: Response<any>;
    isApiError: boolean;
    toJSON?: Function;
}
