
import { AnyPlainObj, CtxData } from './declare/types'
import { RequestConfig, XHRRequest } from './declare/interface'
import { merge } from './helpers/utils'
import XHR from './xhr/xhr'
import Context from './core/context'

type Extend = { xhr?: XHRRequest } & AnyPlainObj

export default class OiO extends Context {
  constructor (request?: RequestConfig, data?: CtxData, extend?: Extend) {
    super(request || {}, data || {}, merge({ xhr: XHR }, extend || {}))
  }
}
