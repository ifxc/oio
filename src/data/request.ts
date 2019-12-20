import { Request } from '../declare/interface'

const request: Request = {
  url: '',
  method: 'get',
  headers: {
    'Content-Type': '', // default object=>json URLSearchParams => urlencoded
    'Accept': 'application/json, text/plain, */*'
  },
  timeout: 0,
  withCredentials: false,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
}

export default request
