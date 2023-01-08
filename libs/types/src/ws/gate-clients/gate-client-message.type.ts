import { GateEvent } from '../gates/gate-event.type';
import { GateClientEvent } from './gate-client-event.enum';

export type GateClientMessage<T> = {
  data: T,
  event: GateClientEvent,
}

export type GateMessage<T> = {
  data: T,
  event: GateEvent,
}
