import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { OnlyAuthHandleConnectionService } from '../services/only-auth-handle-connection.service';


@WebSocketGateway({ path: '/connecting' })
export class ConnectionsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private onlyAuthGuard: OnlyAuthHandleConnectionService,
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
      }, null, 4));

      return;
    }

  }

  handleDisconnect(client: any) {
    this.logger.debug(JSON.stringify({
      event: 'client is disconnected',
    }, null, 4));
  }
}
