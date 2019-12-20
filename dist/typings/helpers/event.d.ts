import { AnyPlainObj, EventCallback } from '../declare/types';
export default class Event {
    static EventMap: AnyPlainObj;
    scope: string;
    constructor(scope?: string);
    emit(name: string, ...args: any[]): void;
    on(name: string, callback: EventCallback): void;
    off(name: string): void;
}
