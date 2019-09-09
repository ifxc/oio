import Context from '../core/context'

type AnyPlainObj = { [prop:string]: any }
type FnNext<T> = (ctx: Context, next?: FnNext<T> | any) => Promise<any>
type CtxData = {
  [prop: string]: any
}

type RequestMethod = 'delete' | 'get' | 'head' | 'options' | 'post' | 'put' | 'patch'

type ResponseType = 'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'Blob'

type RequestBody = string | { [prop: string]: any } | ArrayBuffer | ArrayBufferView | URLSearchParams | FormData | File | Blob

export { AnyPlainObj, FnNext, CtxData, RequestMethod, ResponseType, RequestBody }
