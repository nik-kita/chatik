import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { JwtAccessPayload } from '../../../../libs/types/src';
import { ConnectedSocketManager } from '../services/connected-socket-manager';
import { OnlyAuthHandleConnectionService } from '../services/only-auth-handle-connection.service';



export abstract class ConnectionsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    protected onlyAuthGuard: OnlyAuthHandleConnectionService,
    protected connectedSocketManager: ConnectedSocketManager,
    protected logger: Logger,
  ) { }

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.debug('.afterInit()');
  }

  // TODO find way to replace this logic to WsExceptionFilter
  async handleConnection(client: WebSocket, firstArg = {}) {
    let jwtError: Error | null = null;
    let payload: JwtAccessPayload | null = null;

    // TODO check jwt error codes, define exceptions
    try {
      payload = await this.onlyAuthGuard.verifyUserFromBearer(firstArg);
    } catch (error) {
      jwtError = error;
    }

    if (jwtError || !payload) {
      const ERR_CODE = 4003;
      const errorData = JSON.stringify({
        error: 'Unauthorized',
        code: ERR_CODE,
        reason: jwtError
          ? String(jwtError)
          : 'Ws client should have /Authorization/ header with Bearer access token',
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
