import { WebSocket } from 'ws';

export type GateClient = {
  userId: string,
  ws: WebSocket,
};
