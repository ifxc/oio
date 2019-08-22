declare const _default: {
    write: (name: string, value: string, expires: number, path?: string | undefined, domain?: string | undefined, secure?: boolean | undefined) => void;
    read: (name: string) => string | null;
    remove: (name: string) => void;
};
export default _default;
