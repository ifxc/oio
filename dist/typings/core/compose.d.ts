import { FnNext } from '../declare/type';
import Service from './context';
/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
export default function compose(middleware: ((ctx: Service, ...arg: any[]) => any)[]): (context: Service, next?: FnNext<any> | undefined) => Promise<any>;
