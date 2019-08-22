import { Request, Response } from '../declare/interface';
interface NewError extends Error {
    code?: string;
    request?: Request;
    response?: Response;
    isAxiosError?: boolean;
    toJSON?: Function;
}
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
export default function createError(message: string, request: Request, code: string | null, response?: Response): NewError;
export {};
