import { AnyPlainObj } from '../declare/type';
export default class Event {
    static EventMap: AnyPlainObj;
    scope: string;
    constructor(scope?: string);
    emit(name: string, ...args: any[]): void;
    on(name: string, callback: (...args: any) => void): void;
    off(name: string): void;
}
