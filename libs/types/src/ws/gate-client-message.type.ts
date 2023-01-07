export type GateClientMessage<T, U = 'message'> = {
  data: T,
  event: U,
}
