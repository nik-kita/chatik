import { GateClientEvent, GateClientMessage } from '../../../../types/src';

export abstract class GateClientDto<T extends object> {
  data: T;
  event: GateClientEvent;

  protected abstract generateJson(data: T): GateClientMessage<T>;

  protected jsonToString(data: T) {
    return JSON.stringify(this.generateJson(data));
  }
}
