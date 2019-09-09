
import { isStandardBrowserEnv, isString } from './is'

type OriginURL<T> = {
  href: T,
  protocol: T,
  host: T,
  search: T,
  hash: T,
  hostname: T,
  port: T,
  pathname: T
}

export default (
  isStandardBrowserEnv()
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    ? (function standardBrowserEnv () {
      const msie = /(msie|trident)/i.test(navigator.userAgent)
      const urlParsingNode = document.createElement('a')
      let originURL: OriginURL<string>

      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
      function resolveURL (url: string) {
        let href = url

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href)
          href = urlParsingNode.href
        }

        urlParsingNode.setAttribute('href', href)

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
        }
      }

      originURL = resolveURL(window.location.href)

      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
      return function isURLSameOrigin (requestURL: string | OriginURL<string>) : boolean {
        const parsed = (isString(requestURL)) ? resolveURL(<string>requestURL) : requestURL
        return ((<OriginURL<string>>parsed).protocol === originURL.protocol &&
          (<OriginURL<string>>parsed).host === originURL.host)
      }
    })()

    // Non standard browser envs (web workers, react-native) lack needed support.
    : (function nonStandardBrowserEnv () {
      return function isURLSameOrigin () : boolean {
        return true
      }
    })()
)
