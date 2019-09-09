
import { AnyPlainObj } from '../declare/type'

export default class Event {
  static EventMap: AnyPlainObj = {}
  scope: string = ''
  constructor (scope: string = '') {
    this.scope = scope ? scope + ':' : ''
  }
  emit (name: string, ...args: any[]) {
    const key = this.scope + name
    if (Event.EventMap[key]) {
      Event.EventMap[key].forEach((event: (...args: any[]) => void) => {
        event.apply(this, args)
      })
    }
  }
  on (name: string, callback: (...args: any) => void) {
    const key = this.scope + name
    if (typeof callback === 'function') {
      if (!Event.EventMap[key]) Event.EventMap[key] = []
      Event.EventMap[key].push(callback)
    }
  }
  off (name: string) {
    delete Event.EventMap[this.scope + name]
  }
}
