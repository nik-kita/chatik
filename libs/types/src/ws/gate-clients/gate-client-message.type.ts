import { GateClientEvent } from './gate-client-event.enum';

export type GateClientMessage<T, U extends GateClientEvent> = {
  data: T,
  event: U,
}
