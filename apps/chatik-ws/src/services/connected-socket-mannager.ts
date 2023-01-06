import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';


// TODO mv to types
type Client = {
  userId: string,
  ws: WebSocket,
};

@Injectable()
export class ConnectedSocketManager {
  private clientByUserIdMap = new Map<string, Client>();
  private clientByWsMap = new WeakMap<WebSocket, Client>();

  insert(userId: string, ws: WebSocket) {
    const client: Client = {
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

  private rm(client: Client) {
    this.clientByUserIdMap.delete(client.userId);
    this.clientByWsMap.delete(client.ws);
  }
}
