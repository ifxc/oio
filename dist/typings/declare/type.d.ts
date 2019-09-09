import Context from '../core/context';
declare type AnyPlainObj = {
    [prop: string]: any;
};
declare type FnNext<T> = (ctx: Context, next?: FnNext<T> | any) => Promise<any>;
declare type CtxData = {
    [prop: string]: any;
};
declare type RequestMethod = 'delete' | 'get' | 'head' | 'options' | 'post' | 'put' | 'patch';
declare type ResponseType = 'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'Blob';
declare type RequestBody = string | {
    [prop: string]: any;
} | ArrayBuffer | ArrayBufferView | URLSearchParams | FormData | File | Blob;
export { AnyPlainObj, FnNext, CtxData, RequestMethod, ResponseType, RequestBody };
