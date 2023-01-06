import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';
import { WsAuthClient } from '../../../../libs/types/src';


@Injectable()
export class ConnectedSocketManager {
  private clientByUserIdMap = new Map<string, WsAuthClient>();
  private clientByWsMap = new WeakMap<WebSocket, WsAuthClient>();

  insert(userId: string, ws: WebSocket) {
    const client: WsAuthClient = {
      userId,
      ws,
    };

    this.clientByUserIdMap.set(userId, client);
    this.clientByWsMap.set(ws, client);
  }

  getByUserId(userId: string) {
    return this.clientByUserIdMap.get(userId);
  }

  getBeWs(ws: WebSocket) {
    return this.clientByWsMap.get(ws);
  }

  rmByWs(ws: WebSocket) {
    const client = this.clientByWsMap.get(ws);

    if (client) {
      this.rm(client)

      return client.userId;
    }

    return null;
  }

  rmByUserId(userId: string) {
    const client = this.clientByUserIdMap.get(userId);

    if (client) {
      this.rm(client)

      return client.userId;
    }

    return null;
  }

  private rm(client: WsAuthClient) {
    this.clientByUserIdMap.delete(client.userId);
    this.clientByWsMap.delete(client.ws);
  }
}
