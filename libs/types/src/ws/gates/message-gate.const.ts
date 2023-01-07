export enum MessageGateEvent {
  SEND_MESSAGE = 'sendMessage',
}

export type IMessageGate = Record<MessageGateEvent, (...args: any[]) => void>;
