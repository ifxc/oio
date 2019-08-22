declare type OriginURL<T> = {
    href: T;
    protocol: T;
    host: T;
    search: T;
    hash: T;
    hostname: T;
    port: T;
    pathname: T;
};
declare const _default: (requestURL: string | OriginURL<string>) => boolean;
export default _default;
