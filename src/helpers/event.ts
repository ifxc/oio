
import { AnyPlainObj, EventCallback } from '../declare/types'
import { isFunction } from './is'

export default class Event {
  static EventMap: AnyPlainObj = {}
  scope: string = ''
  constructor (scope: string = '') {
    this.scope = scope ? scope + ':' : ''
  }
  emit (name: string, ...args: any[]) {
    const key = this.scope + name
    if (Event.EventMap[key]) {
      Event.EventMap[key].forEach((callback: EventCallback) => {
        callback.apply(this, args)
      })
    }
  }
  on (name: string, callback: EventCallback) {
    const key = this.scope + name
    if (isFunction(callback)) {
      if (!Event.EventMap[key]) Event.EventMap[key] = []
      Event.EventMap[key].push(callback)
    }
  }
  off (name: string) {
    delete Event.EventMap[this.scope + name]
  }
}
