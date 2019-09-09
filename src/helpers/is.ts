
const toString = Object.prototype.toString

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray (val: any) : boolean {
  return toString.call(val) === '[object Array]'
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
export function isArrayBuffer (val: any) : boolean {
  return toString.call(val) === '[object ArrayBuffer]'
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
export function isFormData (val: any) : boolean {
  return (typeof FormData !== 'undefined') && (val instanceof FormData)
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
export function isString (val: any) : boolean {
  return typeof val === 'string'
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
export function isNumber (val: any) : boolean {
  return typeof val === 'number'
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
export function isUndefined (val: any) : boolean {
  return typeof val === 'undefined'
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject (val: any) : boolean {
  return val !== null && typeof val === 'object'
}

/**
 * Determine if a value is an Plain Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isPlainObject (val: any) : boolean {
  return toString.call(val) === '[object Object]'
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
export function isDate (val: any) : boolean {
  return toString.call(val) === '[object Date]'
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
export function isFile (val: any) : boolean {
  return toString.call(val) === '[object File]'
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
export function isBlob (val: any) : boolean {
  return toString.call(val) === '[object Blob]'
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
export function isFunction (val: any) : boolean {
  return toString.call(val) === '[object Function]'
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
export function isStream (val: any) : boolean {
  return isObject(val) && isFunction(val.pipe)
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
export function isURLSearchParams (val: any) : boolean {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
export function isStandardBrowserEnv () : boolean {
  if (typeof navigator !== 'undefined' &&
    (navigator.product === 'ReactNative' ||
    navigator.product === 'NativeScript' ||
    navigator.product === 'NS')) {
    return false
  }
  return (
    typeof window !== 'undefined' && typeof document !== 'undefined'
  )
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
export function isArrayBufferView (val: any) : boolean {
  let result: boolean
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val)
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer)
  }
  return result
}
