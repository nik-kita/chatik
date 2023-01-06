import { WebSocket } from 'ws';

export type WsAuthClient = {
  userId: string,
  ws: WebSocket,
};
