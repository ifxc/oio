
enum RequestMethodNoData {
  Delete = 'delete',
  Get = 'get',
  Head = 'head',
  Options = 'options'
}

enum RequestMethodWithData {
  Post = 'post',
  Put = 'put',
  Patch = 'patch'
}

enum RequestMethod {
  Delete = 'delete',
  Get = 'get',
  Head = 'head',
  Options = 'options',
  Post = 'post',
  Put = 'put',
  Patch = 'patch'
}

enum ResponseType {
  Arraybuffer = 'arraybuffer',
  Document = 'document',
  Json = 'json',
  Text = 'text',
  Stream = 'stream',
  Blob = 'Blob'
}

export { RequestMethodWithData, RequestMethodNoData, RequestMethod, ResponseType }
