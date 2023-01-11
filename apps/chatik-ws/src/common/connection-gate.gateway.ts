import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { ConnectedSocketManager } from './services/connected-socket-manager';
import { WsJwtAccessGuard } from './services/ws-jwt-access.guard';




@WebSocketGateway()
export abstract class ConnectionGate implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    protected wsJwtAccessGuard: WsJwtAccessGuard,
    protected connectedSocketManager: ConnectedSocketManager,
    protected logger: Logger,
  ) { }

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.debug('.afterInit()');
  }

  async handleConnection(client: WebSocket, firstArg = {}) {
    const payload = await this.wsJwtAccessGuard.verifyUserFromBearer(client, firstArg);

    if (!payload) return;

    this.connectedSocketManager.insert(payload.user_id, client);
    this.logger.debug({
      event: 'new connection',
      user_id: payload.user_id,
    });

  }

  handleDisconnect(client: any) {
    this.logger.debug({
      event: 'disconnect',
      user_id: this.connectedSocketManager.rmByWs(client),
    });
  }
}
