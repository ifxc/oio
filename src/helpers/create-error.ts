
import { Request, Response } from '../declare/interface'

interface NewError extends Error {
  code?: string,
  request?: Request,
  response?: Response,
  isAxiosError?: boolean,
  toJSON?: Function
}

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
function enhanceError (error: NewError, request: Request, code: string | null, response?: Response) : NewError {
  if (code) {
    error.code = code
  }

  error.request = request
  error.response = response
  error.isAxiosError = true

  error.toJSON = function () {
    const ctx: any = this
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: ctx.description,
      number: ctx.number,
      // Mozilla
      fileName: ctx.fileName,
      lineNumber: ctx.lineNumber,
      columnNumber: ctx.columnNumber,
      stack: this.stack,
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
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
export default function createError (message: string, request: Request, code: string | null, response?: Response) : NewError {
  const error: NewError = new Error(message)
  return enhanceError(error, request, code, response)
}
