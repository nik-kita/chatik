export enum MessageGatewayEvent {
  SEND_MESSAGE = 'send-message',
}

export type IMessageGateway = Record<MessageGatewayEvent, any>;
