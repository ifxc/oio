'use strict'

import { isStandardBrowserEnv, isNumber, isString } from './is'

export default (
  isStandardBrowserEnv()
    // Standard browser envs support document.cookie
    ? (function standardBrowserEnv () {
      return {
        write: function write (name: string, value: string, expires: number,
          path?: string, domain?: string, secure?: boolean) {
          // start
          const cookie: string[] = []
          cookie.push(name + '=' + encodeURIComponent(value))

          if (isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toUTCString())
          }

          if (isString(path)) {
            cookie.push('path=' + path)
          }

          if (isString(domain)) {
            cookie.push('domain=' + domain)
          }

          if (secure === true) {
            cookie.push('secure')
          }

          document.cookie = cookie.join('; ')
        },

        read: function read (name: string) {
          const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
          return (match ? decodeURIComponent(match[3]) : null)
        },

        remove: function remove (name: string) {
          this.write(name, '', Date.now() - 86400000)
        }
      }
    })()

    // Non standard browser env (web workers, react-native) lack needed support.
    : (function nonStandardBrowserEnv () {
      return {
        write: function write () {},
        read: function read () { return null },
        remove: function remove () {}
      }
    })()
)
