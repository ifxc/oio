
import { Request, Response, ApiError } from '../declare/interface'
import { AnyPlainObj } from '../declare/types'

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
function enhanceError (error: ApiError, code: string, request: Request, response?: Response) : ApiError {
  error.code = code
  error.request = request
  error.response = response

  error.toJSON = function () {
    const ctx: ApiError & AnyPlainObj = this
    return {
      // Standard
      message: ctx.message,
      name: ctx.name,
      // Microsoft
      description: ctx.description,
      number: ctx.number,
      // Mozilla
      fileName: ctx.fileName,
      lineNumber: ctx.lineNumber,
      columnNumber: ctx.columnNumber,
      stack: ctx.stack,
      // Instance
      request: ctx.request,
      code: ctx.code
    }
  }
  return error
}

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
export default function createError (message: string, code: string = '', request: Request, response?: Response) : ApiError {
  const error: Error = new Error(message)
  return enhanceError(<ApiError>error, code, request, response)
}
