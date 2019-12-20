
export type AnyPlainObj = { [prop:string]: any }

export type FnNext<T> = (ctx: T, next: () => Promise<any>) => Promise<any>

export type CtxData = AnyPlainObj

export type RequestMethodNoData = 'delete' | 'get' | 'head' | 'options' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS'

export type RequestMethodWithData = 'post' | 'put' | 'patch' | 'POST' | 'PUT' | 'PATCH'

export type RequestMethod = RequestMethodNoData | RequestMethodWithData

export type XhrSendBody = string | Document | ArrayBuffer | ArrayBufferView | URLSearchParams | FormData | File | Blob | ReadableStream<Uint8Array> | null | undefined

export type RequestParam = AnyPlainObj | URLSearchParams

export type RequestData = XhrSendBody | AnyPlainObj

export type ResponseType = 'arraybuffer' | 'document' | 'json' | 'text' | 'blob' | ''

type LocationGeneric<T> = {
  href: T,
  protocol: T,
  host: T,
  search: T,
  hash: T,
  hostname: T,
  port: T,
  pathname: T
}
export type Location = LocationGeneric<string>

export type EventCallback = (...args: any[]) => void

export type ParamsSerializerCallback = ((params: AnyPlainObj | URLSearchParams) => string) | null
