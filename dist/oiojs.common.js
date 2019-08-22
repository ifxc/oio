module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

// CONCATENATED MODULE: ./src/helpers/is.ts
var is_toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
    return is_toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
    return is_toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
    return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
    return typeof val === 'number';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
    return typeof val === 'undefined';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
    return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is an Plain Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isPlainObject(val) {
    return is_toString.call(val) === '[object Object]';
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
    return is_toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
    return is_toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
    return is_toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
    return is_toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
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
function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' &&
        (navigator.product === 'ReactNative' ||
            navigator.product === 'NativeScript' ||
            navigator.product === 'NS')) {
        return false;
    }
    return (typeof window !== 'undefined' && typeof document !== 'undefined');
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
    }
    else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
}

// CONCATENATED MODULE: ./src/helpers/utils.ts

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
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
function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || isUndefined(obj))
        return;
    // Force an array if not already something iterable
    if (!isObject(obj)) {
        obj = [obj];
    }
    if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
            // eslint-disable-next-line no-useless-call
            fn.call(null, obj[i], i, obj);
        }
    }
    else {
        // Iterate over object keys
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                // eslint-disable-next-line no-useless-call
                fn.call(null, obj[key], key, obj);
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
function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var result = {};
    function assignValue(val, key) {
        if (isObject(result[key]) && isObject(val)) {
            result[key] = merge(result[key], val);
        }
        else {
            result[key] = val;
        }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}
/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = deepMerge(result[key], val);
        }
        else if (isPlainObject(val)) {
            result[key] = deepMerge({}, val);
        }
        else {
            result[key] = val;
        }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}

// CONCATENATED MODULE: ./src/helpers/create-error.ts
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
function enhanceError(error, request, code, response) {
    if (code) {
        error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function () {
        var ctx = this;
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
        };
    };
    return error;
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
function createError(message, request, code, response) {
    var error = new Error(message);
    return enhanceError(error, request, code, response);
}

// CONCATENATED MODULE: ./src/helpers/build-url.ts



function encode(val) {
    return encodeURIComponent(val)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
function buildURL(url, params, paramsSerializer) {
    if (!params)
        return url;
    var serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    }
    else if (isURLSearchParams(params)) {
        serializedParams = params.toString();
    }
    else {
        var parts_1 = [];
        forEach(params, function serialize(val, key) {
            if (val === null || isUndefined(val))
                return;
            if (isArray(val)) {
                key = key + '[]';
            }
            else {
                val = [val];
            }
            forEach(val, function parseValue(v) {
                if (isDate(v)) {
                    v = v.toISOString();
                }
                else if (isObject(v)) {
                    v = JSON.stringify(v);
                }
                parts_1.push(encode(key) + '=' + encode(v));
            });
        });
        serializedParams = parts_1.join('&');
    }
    if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}

// CONCATENATED MODULE: ./src/helpers/parse-headers.ts


// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
function parseHeaders(headers) {
    var parsed = {};
    var key, val, i;
    if (!headers) {
        return parsed;
    }
    forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = trim(line.substr(0, i)).toLowerCase();
        val = trim(line.substr(i + 1));
        if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
            }
            if (key === 'set-cookie') {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
            }
            else {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }
    });
    return parsed;
}

// CONCATENATED MODULE: ./src/helpers/is-url-same-origin.ts

/* harmony default export */ var is_url_same_origin = (isStandardBrowserEnv()
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    ? (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;
        /**
        * Parse a URL to discover it's components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */
        function resolveURL(url) {
            var href = url;
            if (msie) {
                // IE needs attribute set twice to normalize properties
                urlParsingNode.setAttribute('href', href);
                href = urlParsingNode.href;
            }
            urlParsingNode.setAttribute('href', href);
            // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
            return {
                href: urlParsingNode.href,
                protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
                host: urlParsingNode.host,
                search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
                hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
                hostname: urlParsingNode.hostname,
                port: urlParsingNode.port,
                pathname: (urlParsingNode.pathname.charAt(0) === '/')
                    ? urlParsingNode.pathname
                    : '/' + urlParsingNode.pathname
            };
        }
        originURL = resolveURL(window.location.href);
        /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */
        return function isURLSameOrigin(requestURL) {
            var parsed = (isString(requestURL)) ? resolveURL(requestURL) : requestURL;
            return (parsed.protocol === originURL.protocol &&
                parsed.host === originURL.host);
        };
    })()
    // Non standard browser envs (web workers, react-native) lack needed support.
    : (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
            return true;
        };
    })());

// CONCATENATED MODULE: ./src/helpers/cookies.ts


/* harmony default export */ var cookies = (isStandardBrowserEnv()
    // Standard browser envs support document.cookie
    ? (function standardBrowserEnv() {
        return {
            write: function write(name, value, expires, path, domain, secure) {
                // start
                var cookie = [];
                cookie.push(name + '=' + encodeURIComponent(value));
                if (isNumber(expires)) {
                    cookie.push('expires=' + new Date(expires).toUTCString());
                }
                if (isString(path)) {
                    cookie.push('path=' + path);
                }
                if (isString(domain)) {
                    cookie.push('domain=' + domain);
                }
                if (secure === true) {
                    cookie.push('secure');
                }
                document.cookie = cookie.join('; ');
            },
            read: function read(name) {
                var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return (match ? decodeURIComponent(match[3]) : null);
            },
            remove: function remove(name) {
                this.write(name, '', Date.now() - 86400000);
            }
        };
    })()
    // Non standard browser env (web workers, react-native) lack needed support.
    : (function nonStandardBrowserEnv() {
        return {
            write: function write() { },
            read: function read() { return null; },
            remove: function remove() { }
        };
    })());

// CONCATENATED MODULE: ./src/adapter/xhrAdapter.ts







function xhrAdapter(request) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = request.data;
        var requestHeaders = request.headers;
        if (isFormData(requestData)) {
            delete requestHeaders['Content-Type']; // Let the browser set it
        }
        var xhr = new XMLHttpRequest();
        // HTTP basic authentication
        if (request.auth) {
            var username = request.auth.username || '';
            var password = request.auth.password || '';
            requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
        xhr.open(request.method.toUpperCase(), buildURL(request.url, request.params, request.paramsSerializer), true);
        // Set the request timeout in MS
        xhr.timeout = request.timeout;
        // Listen for ready state
        xhr.onreadystatechange = function handleLoad() {
            if (!xhr)
                return;
            if (!request || xhr.readyState !== 4) {
                return;
            }
            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (xhr.status === 0 && !(xhr.responseURL && xhr.responseURL.indexOf('file:') === 0)) {
                return;
            }
            // Prepare the response
            var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(xhr.getAllResponseHeaders()) : null;
            var responseData = !request.responseType || request.responseType === 'text' ? xhr.responseText : xhr.response;
            var response = {
                data: responseData,
                status: xhr.status,
                statusText: xhr.statusText,
                headers: responseHeaders,
                request: request
            };
            resolve(response);
            // Clean up request
            xhr = null;
        };
        // Handle low level network errors
        xhr.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(createError('Network Error', request, null));
            // Clean up request
            xhr = null;
        };
        // Handle timeout
        xhr.ontimeout = function handleTimeout() {
            reject(createError('timeout of ' + request.timeout + 'ms exceeded', request, 'ECONNABORTED'));
            // Clean up request
            xhr = null;
        };
        // Handle abort
        // xhr.abort()
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (isStandardBrowserEnv()) {
            // Add xsrf header
            var xsrfValue = (request.withCredentials || is_url_same_origin(request.url)) && request.xsrfCookieName
                ? cookies.read(request.xsrfCookieName)
                : undefined;
            if (xsrfValue) {
                requestHeaders[request.xsrfHeaderName] = xsrfValue;
            }
        }
        // Add headers to the request
        if ('setRequestHeader' in xhr) {
            forEach(requestHeaders, function setRequestHeader(val, key) {
                if ((isUndefined(requestData) || requestData === null) && key.toLowerCase() === 'content-type') {
                    // Remove Content-Type if data is undefined
                    delete requestHeaders[key];
                }
                else {
                    // Otherwise add header to the request
                    xhr.setRequestHeader(key, val);
                }
            });
        }
        // Add withCredentials to request if needed
        if (request.withCredentials) {
            xhr.withCredentials = true;
        }
        // Add responseType to request if needed
        if (request.responseType) {
            try {
                xhr.responseType = request.responseType;
            }
            catch (e) {
                // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                if (request.responseType !== 'json') {
                    throw e;
                }
            }
        }
        // Handle progress if needed
        if (typeof request.onDownloadProgress === 'function') {
            xhr.addEventListener('progress', request.onDownloadProgress);
        }
        // Not all browsers support upload events
        if (typeof request.onUploadProgress === 'function' && xhr.upload) {
            xhr.upload.addEventListener('progress', request.onUploadProgress);
        }
        if (requestData === undefined) {
            requestData = null;
        }
        // Send the request
        // @ts-ignore
        xhr.send(requestData);
    });
}

// CONCATENATED MODULE: ./src/declare/enum.ts
var RequestMethodNoData;
(function (RequestMethodNoData) {
    RequestMethodNoData["Delete"] = "delete";
    RequestMethodNoData["Get"] = "get";
    RequestMethodNoData["Head"] = "head";
    RequestMethodNoData["Options"] = "options";
})(RequestMethodNoData || (RequestMethodNoData = {}));
var RequestMethodWithData;
(function (RequestMethodWithData) {
    RequestMethodWithData["Post"] = "post";
    RequestMethodWithData["Put"] = "put";
    RequestMethodWithData["Patch"] = "patch";
})(RequestMethodWithData || (RequestMethodWithData = {}));
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["Delete"] = "delete";
    RequestMethod["Get"] = "get";
    RequestMethod["Head"] = "head";
    RequestMethod["Options"] = "options";
    RequestMethod["Post"] = "post";
    RequestMethod["Put"] = "put";
    RequestMethod["Patch"] = "patch";
})(RequestMethod || (RequestMethod = {}));
var ResponseType;
(function (ResponseType) {
    ResponseType["Arraybuffer"] = "arraybuffer";
    ResponseType["Document"] = "document";
    ResponseType["Json"] = "json";
    ResponseType["Text"] = "text";
    ResponseType["Stream"] = "stream";
    ResponseType["Blob"] = "Blob";
})(ResponseType || (ResponseType = {}));


// CONCATENATED MODULE: ./src/data/request.ts

var request_request = {
    url: '',
    method: RequestMethod.Get,
    headers: {
        'Content-Type': '',
        'Accept': 'application/json, text/plain, */*'
    },
    params: {},
    paramsSerializer: null,
    data: null,
    timeout: 0,
    withCredentials: false,
    auth: null,
    responseType: ResponseType.Json,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    onDownloadProgress: function (ev) { return ev; },
    onUploadProgress: function (ev) { return ev; }
};
/* harmony default export */ var data_request = (request_request);

// CONCATENATED MODULE: ./src/adapter/xhr.ts




var XHR = {
    request: function (request) {
        if (typeof request === 'string') {
            request = arguments[1] || {};
            request.url = arguments[0];
        }
        else {
            request = request || {};
        }
        request = merge(data_request, request);
        var isPass = isFormData(request.data) || isArrayBuffer(request.data) ||
            isStream(request.data) || isFile(request.data) || isBlob(request.data);
        if (isArrayBufferView(request.data)) {
            request.data = request.buffer;
        }
        if (isURLSearchParams(request.data)) {
            if (!request.headers['Content-Type']) {
                request.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            }
            request.data = request.data.toString();
        }
        if (!isPass && isObject(request.data)) {
            if (!request.headers['Content-Type']) {
                request.headers['Content-Type'] = 'application/json;charset=utf-8';
            }
            request.data = JSON.stringify(request.data);
        }
        return xhrAdapter(request).then(function (response) {
            // default json
            if (typeof response.data === 'string') {
                try {
                    response.data = JSON.parse(response.data);
                }
                catch (e) { /* Ignore */ }
            }
            return response;
        });
    }
};
forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    XHR[method] = function (url, config) {
        return this.request(merge(config || {}, {
            method: method,
            url: url
        }));
    };
});
forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    XHR[method] = function (url, data, config) {
        return this.request(merge(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
});
/* harmony default export */ var adapter_xhr = (XHR);

// CONCATENATED MODULE: ./src/data/response.ts
/* harmony default export */ var data_response = ({
    data: null,
    status: 0,
    statusText: '',
    headers: {},
    request: null
});

// CONCATENATED MODULE: ./src/core/compose.ts
/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
function compose(middleware) {
    if (!Array.isArray(middleware))
        throw new TypeError('Middleware stack must be an array!');
    for (var _i = 0, middleware_1 = middleware; _i < middleware_1.length; _i++) {
        var fn = middleware_1[_i];
        if (typeof fn !== 'function')
            throw new TypeError('Middleware must be composed of functions!');
    }
    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */
    return function (context, next) {
        // last called middleware #
        var index = -1;
        return dispatch(0);
        function dispatch(i) {
            if (i <= index)
                return Promise.reject(new Error('next() called multiple times'));
            index = i;
            var fn = middleware[i];
            if (i === middleware.length)
                fn = next;
            if (!fn)
                return Promise.resolve();
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    };
}

// CONCATENATED MODULE: ./src/core/context.ts





var context_Context = /** @class */ (function () {
    /**
     * @param {Request} Request config
     * @param {CtxData} Context data，This context`s data is for middleware use
     * @param extend The extend mainly stores references to third-party libraries
     */
    function Context(request, data, extend) {
        // Storage context data，This context`s data is for middleware use
        this.$data = {};
        // The extend mainly stores references to third-party libraries
        this.extend = {};
        // Storage middleware function
        this.middleware = [];
        if (data) {
            this.$data = merge(this.$data, data);
        }
        if (extend) {
            this.extend = extend;
        }
        if (this.extend.ajax) {
            Context.XHR = this.ajax = this.extend.ajax;
        }
        else {
            Context.XHR = this.ajax = {};
        }
        this.request = deepMerge(Context.newReq(), request || {});
        this.response = Context.newRes();
        this.parent = this;
    }
    // Used to isolate from default request
    Context.newReq = function () {
        return deepMerge({}, Context.$Request);
    };
    // Used to isolate from default response
    Context.newRes = function () {
        return deepMerge({}, Context.$Response);
    };
    /**
     * Add a middleware
     * @param {FnNext<any>}
     */
    Context.prototype.use = function (fn) {
        this.middleware.push(fn);
    };
    /**
     * Run middleware
     * @param {FnNext<any>}
     * @returns {Promise<Response>}
     */
    Context.prototype.run = function (next) {
        var fn = compose([
            function getResponse(ctx, next) {
                return next().then(function () { return ctx.getRes(); });
            }
        ].concat(this.middleware));
        return fn(this, next || function request(ctx, next) {
            if (ctx.ajax && ctx.ajax.request) {
                return ctx.ajax.request(ctx.getReq() || {})
                    .then(function (response) { return ctx.setRes(response); });
            }
            return Promise.reject(createError('Network Error', ctx.request, null));
        });
    };
    /**
     * Create a new context object for each ajax request
     * @returns {Context} return context, but add $data、request、response、parent attribute in new context
     */
    Context.prototype.newCtx = function () {
        var ctx = Object.create(this);
        ctx.$data = {};
        ctx.request = {};
        ctx.response = {};
        ctx.parent = this;
        return ctx;
    };
    /**
     * Setting the context data in the current context
     * This context`s data is for middleware use
     * @param data
     * @returns {Context}
     */
    Context.prototype.setCtxData = function (data) {
        this.$data = merge(this.$data, data);
        return this;
    };
    /**
     * Get the context`s data in the current context
     * @returns {CtxData}
     */
    Context.prototype.getCtxData = function () {
        return this.$data;
    };
    /**
     * Setting the request in current context and deep merged request
     * @param {Request|AnyPlainObj} request config
     * @returns {Context}
     */
    Context.prototype.setReq = function (request) {
        this.request = deepMerge(this.request || {}, request);
        return this;
    };
    /**
     * Getting the request in current context
     * The request deep merged request of the parent objects
     * @returns {Request | null}
     */
    Context.prototype.getReq = function () {
        var requests = [];
        function findReq(instance) {
            var obj = Object.getPrototypeOf(instance);
            if (!obj || !obj.request)
                return;
            requests.push(obj.request);
            findReq(obj);
        }
        findReq(this);
        return deepMerge.apply(void 0, [{}].concat(requests.reverse(), [this.request]));
    };
    /**
     * Setting the response in current context
     * @param {Response|AnyPlainObj} response data
     * @returns {Context}
     */
    Context.prototype.setRes = function (response) {
        this.response = merge(this.response, response);
        return this;
    };
    /**
     * Getting the response in current context
     * @returns {Response | AnyPlainObj}
     */
    Context.prototype.getRes = function () {
        return deepMerge({}, this.response);
    };
    /**
     * Setting the url in current context`s request url
     * @param {String} request url
     * @returns {Context}
     */
    Context.prototype.setUrl = function (url) {
        if (this.request) {
            this.request.url = url;
        }
        else {
            this.request = { url: url };
        }
        return this;
    };
    /**
     * Setting the method in current context`s request`s method
     * @param {String} delete、get、head、options、post、put、patch
     * @returns {Context}
     */
    Context.prototype.setMethod = function (method) {
        if (this.request) {
            this.request.method = method;
        }
        else {
            this.request = { method: method };
        }
        return this;
    };
    /**
     * Setting the data in current context`s request data
     * @param {RequestBody} string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams, FormData, File, Blob
     * @returns {Context}
     */
    Context.prototype.setData = function (data) {
        if (this.request) {
            this.request.data = data;
        }
        else {
            this.request = { data: data };
        }
        return this;
    };
    /**
     * Setting the params in current context`s request params
     * @param {AnyPlainObj} plain object for params
     * @returns {Context}
     */
    Context.prototype.setParams = function (params) {
        if (this.request) {
            this.request.params = params;
        }
        else {
            this.request = { params: params };
        }
        return this;
    };
    /**
     * Setting the headers in current context`s request headers
     * @param {AnyPlainObj} headers object
     * @returns {Context}
     */
    Context.prototype.setHeaders = function (headers) {
        if (this.request) {
            this.request.headers = merge(this.request.headers, headers);
        }
        else {
            this.request = { headers: headers };
        }
        return this;
    };
    // Define default request data config
    Context.$Request = data_request;
    // Define default response data structure
    Context.$Response = data_response;
    return Context;
}());
/* harmony default export */ var context = (context_Context);

// CONCATENATED MODULE: ./src/index.ts




var src_OiO = /** @class */ (function (_super) {
    __extends(OiO, _super);
    function OiO(request, data, extend) {
        return _super.call(this, request || {}, data || {}, merge({ ajax: adapter_xhr }, extend || {})) || this;
    }
    return OiO;
}(context));
/* harmony default export */ var src = (src_OiO);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ })["default"];
//# sourceMappingURL=oiojs.common.js.map