
import { AnyPlainObj } from '../declare/types'
import { isArray, isUndefined, isObject, isPlainObject } from './is'

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
export function trim (str: string) : string {
  return str.replace(/^\s*/, '').replace(/\s*$/, '')
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
export function forEach (obj: any, fn: Function) : void {
  // Don't bother if no value provided
  if (obj === null || isUndefined(obj)) return

  // Force an array if not already something iterable
  if (!isObject(obj)) {
    obj = [obj]
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      // eslint-disable-next-line no-useless-call
      fn.call(null, obj[i], i, obj)
    }
  } else {
    // Iterate over object keys
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // eslint-disable-next-line no-useless-call
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
export function merge (...args: AnyPlainObj[]) : AnyPlainObj {
  const result: AnyPlainObj = {}
  function assignValue (val: any, key: string) {
    if (isObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val)
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = args.length; i < l; i++) {
    forEach(arguments[i], assignValue)
  }
  return result
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
export function deepMerge (...args: AnyPlainObj[]) : AnyPlainObj {
  const result: AnyPlainObj = {}

  function assignValue (val: any, key: string) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = deepMerge(result[key], val)
    } else if (isPlainObject(val)) {
      result[key] = deepMerge({}, val)
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = args.length; i < l; i++) {
    forEach(arguments[i], assignValue)
  }
  return result
}
