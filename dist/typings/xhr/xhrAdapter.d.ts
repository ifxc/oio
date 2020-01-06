import { Request, Response } from '../declare/interface';
export default function xhrAdapter(request: Request): Promise<Response<any>>;
