export enum GateClientEvent {
  RECEIVE_MESSAGE = 'receiveMessage',
  RECEIVE_SEND_MESSAGE_STATUS = 'receiveSendMessageStatus',
}

export type GateClientMessage<T, U extends GateClientEvent> = {
  data: T,
  event: U,
}
