import { AnyPlainObj, CtxData } from './declare/types';
import { RequestConfig, XHRRequest } from './declare/interface';
import Context from './core/context';
declare type Extend = {
    xhr?: XHRRequest;
} & AnyPlainObj;
export default class OiO extends Context {
    constructor(request?: RequestConfig, data?: CtxData, extend?: Extend);
}
export {};
