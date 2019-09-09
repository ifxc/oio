import { RequestMethod, ResponseType } from '../declare/enum'

import { Request } from '../declare/interface'

const request: Request = {
  url: '',
  method: RequestMethod.Get,
  headers: {
    'Content-Type': '', // default object=>json URLSearchParams => urlencoded
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
  onDownloadProgress: ev => ev,
  onUploadProgress: ev => ev
}

export default request
