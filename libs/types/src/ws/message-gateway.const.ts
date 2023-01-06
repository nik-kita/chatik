export const MESSAGE_GATEWAY_EVENTS = [
  'on-send-message',
] as const;

export type MessageGatewayEvent = typeof MESSAGE_GATEWAY_EVENTS[number];

export type IMessageGateway = Record<MessageGatewayEvent, any>;