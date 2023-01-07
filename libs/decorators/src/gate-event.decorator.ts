import { SubscribeMessage } from '@nestjs/websockets';

export function GateEvent() {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    SubscribeMessage(propertyKey)(target, propertyKey, descriptor);
  };
}
