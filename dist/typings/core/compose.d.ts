import { FnNext } from '../declare/types';
import Context from './context';
/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
export default function compose(middleware: FnNext<Context>[]): (context: Context, next?: FnNext<Context> | undefined) => Promise<any>;
