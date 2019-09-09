import { AnyPlainObj, CtxData } from './declare/type';
import { Request, XHRRequest } from './declare/interface';
import Context from './core/context';
declare type Extend = {
    ajax?: XHRRequest;
    [prop: string]: any;
};
declare class OiO extends Context {
    constructor(request?: Request | AnyPlainObj, data?: CtxData, extend?: Extend);
}
export default OiO;
