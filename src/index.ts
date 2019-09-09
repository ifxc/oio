
import { AnyPlainObj, CtxData } from './declare/type'
import { Request, XHRRequest } from './declare/interface'
import { merge } from './helpers/utils'
import XHR from './adapter/xhr'
import Context from './core/context'

type Extend = { ajax?: XHRRequest, [prop: string]: any }

class OiO extends Context {
  constructor (request?: Request | AnyPlainObj, data?: CtxData, extend?: Extend) {
    super(request || {}, data || {}, merge({ ajax: XHR }, extend || {}))
  }
}

export default OiO
