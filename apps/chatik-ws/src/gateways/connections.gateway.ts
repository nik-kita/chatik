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

  handleConnection(client: WebSocket, firstArg = {}) {
    const headers = (firstArg as {
      rawHeaders?: string[],
    }).rawHeaders?.reduce((acc, h, i, arr) => {
      if ((i + 1) % 2 === 0) acc[arr[i - 1]] = h; 

      return acc;
    }, {} as { Authorization?: string });

    if (headers && headers.Authorization) {
      const { user_id } = this.jwt.verify(String(headers.Authorization.split('Bearer ').at(1)));

      console.log(user_id);

      return;
    }

    // TODO find way to replace this logic into WsExceptionFilter
    client.close(4003, JSON.stringify({
      reason: 'Ws client should have /Authorization/ header with Bearer access token',
    }, null, 4));

    return;
  }

  handleDisconnect(client: any) {
    this.logger.debug(JSON.stringify({
      event: 'client is disconnected',
      client: Object.keys(client),
    }, null, 4));
  }
}
