import EventEmitter from 'events'
import { EventMap, EventName } from '../../../../types/events'

class TypedEventEmitter extends EventEmitter {
    emit<K extends EventName>(event: K, payload: EventMap[K]): boolean {
        return super.emit(event, payload)
    }

    on<K extends EventName>(
        event: K,
        listener: (payload: EventMap[K]) => void
    ): this {
        return super.on(event, listener)
    }

    once<K extends EventName>(
        event: K,
        listener: (payload: EventMap[K]) => void
    ): this {
        return super.once(event, listener)
    }
}

export const appEventEmitter = new TypedEventEmitter()
