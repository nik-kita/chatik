import { SubscribeMessage } from '@nestjs/websockets';

export function SubMessage() {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    SubscribeMessage(propertyKey)(target, propertyKey, descriptor);
  };
}
