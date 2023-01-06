import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';


@WebSocketGateway({ path: '/connecting' })
export class ConnectionsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private jwt: JwtService,
  ) { }

  @WebSocketServer()
  server: Server;

  private logger = new Logger(ConnectionsGateway.name);

  afterInit() {
    this.logger.debug('.afterInit()');
  }

  async handleConnection(client: WebSocket, firstArg = {}) {
    const headers = (firstArg as {
      rawHeaders?: string[],
    }).rawHeaders?.reduce((acc, h, i, arr) => {
      if ((i + 1) % 2 === 0) acc[arr[i - 1]] = h;

      return acc;
    }, {} as { Authorization?: string });

    if (headers && headers.Authorization) {
      const { user_id } = await this.jwt.verifyAsync(String(headers.Authorization.split('Bearer ').at(1)));

      console.log(user_id);

      return;
    }

    throw new WsException({
      reason: 'Ws client should have /Authorization/ header with Bearer access token',
    });
  }

  handleDisconnect() {
    this.logger.debug(JSON.stringify({
      event: 'client is disconnected',
    }, null, 4));
  }
}
