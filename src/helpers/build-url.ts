'use strict'

import { isURLSearchParams, isUndefined, isArray, isDate, isObject } from './is'
import { forEach } from './utils'
import { AnyPlainObj, ParamsSerializerCallback } from '../declare/types'

function encode (val: string) : string {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
export default function buildURL (url: string, params?: AnyPlainObj | URLSearchParams, paramsSerializer?: ParamsSerializerCallback) : string {
  if (!params) return url

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []
    forEach(params, function serialize (val: any, key: string) {
      if (val === null || isUndefined(val)) return

      if (isArray(val)) {
        key = key + '[]'
      } else {
        val = [val]
      }

      forEach(val, function parseValue (v: any) {
        if (isDate(v)) {
          v = (v as Date).toISOString()
        } else if (isObject(v)) {
          v = JSON.stringify(v)
        }
        parts.push(encode(key) + '=' + encode(v))
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#')
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
