import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { OnlyAuthHandleConnectionService } from '../services/only-auth-handle-connection.service';
import { ConnectedSocketManager } from '../services/connected-socket-mannager';


@WebSocketGateway({ path: '/connecting' })
export class ConnectionsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private onlyAuthGuard: OnlyAuthHandleConnectionService,
    private connectedSocketManager: ConnectedSocketManager,
  ) { }

  @WebSocketServer()
  server: Server;

  private logger = new Logger(ConnectionsGateway.name);

  afterInit() {
    this.logger.debug('.afterInit()');
  }

  async handleConnection(client: WebSocket, firstArg = {}) {
    const payload = await this.onlyAuthGuard.verifyUserFromBearer(firstArg);

    // TODO find way to replace this logic with WsException, WsExceptionFilter
    if (!payload) {
      client.close(4003, JSON.stringify({
        reason: 'Ws client should have /Authorization/ header with Bearer access token',
      }));

      return;
    }

    this.connectedSocketManager.insert(payload.user_id, client);
    this.logger.debug({
      event: 'client is connected',
      user_id: payload.user_id,
    });
  }

  handleDisconnect(client: any) {
    this.logger.debug({
      event: 'client is disconnected',
      user_id: this.connectedSocketManager.rmByWs(client),
    });
  }
}
