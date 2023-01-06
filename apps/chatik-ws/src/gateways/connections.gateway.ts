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
      const ERR_CODE = 4003;
      const errorData = JSON.stringify({
        error: 'Unauthorized',
        code: ERR_CODE,
        reason: 'Ws client should have /Authorization/ header with Bearer access token',
      });
      client.send(errorData);
      client.close(ERR_CODE, errorData);

      return;
    }

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
