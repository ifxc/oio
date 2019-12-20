export declare type AnyPlainObj = {
    [prop: string]: any;
};
export declare type FnNext<T> = (ctx: T, next: () => Promise<any>) => Promise<any>;
export declare type CtxData = AnyPlainObj;
export declare type RequestMethodNoData = 'delete' | 'get' | 'head' | 'options' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS';
export declare type RequestMethodWithData = 'post' | 'put' | 'patch' | 'POST' | 'PUT' | 'PATCH';
export declare type RequestMethod = RequestMethodNoData | RequestMethodWithData;
export declare type XhrSendBody = string | Document | ArrayBuffer | ArrayBufferView | URLSearchParams | FormData | File | Blob | ReadableStream<Uint8Array> | null | undefined;
export declare type RequestParam = AnyPlainObj | URLSearchParams;
export declare type RequestData = XhrSendBody | AnyPlainObj;
export declare type ResponseType = 'arraybuffer' | 'document' | 'json' | 'text' | 'blob' | '';
declare type LocationGeneric<T> = {
    href: T;
    protocol: T;
    host: T;
    search: T;
    hash: T;
    hostname: T;
    port: T;
    pathname: T;
};
export declare type Location = LocationGeneric<string>;
export declare type EventCallback = (...args: any[]) => void;
export declare type ParamsSerializerCallback = ((params: AnyPlainObj | URLSearchParams) => string) | null;
export {};
