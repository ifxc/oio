declare enum RequestMethodNoData {
    Delete = "delete",
    Get = "get",
    Head = "head",
    Options = "options"
}
declare enum RequestMethodWithData {
    Post = "post",
    Put = "put",
    Patch = "patch"
}
declare enum RequestMethod {
    Delete = "delete",
    Get = "get",
    Head = "head",
    Options = "options",
    Post = "post",
    Put = "put",
    Patch = "patch"
}
declare enum ResponseType {
    Arraybuffer = "arraybuffer",
    Document = "document",
    Json = "json",
    Text = "text",
    Stream = "stream",
    Blob = "Blob"
}
export { RequestMethodWithData, RequestMethodNoData, RequestMethod, ResponseType };
