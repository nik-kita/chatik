import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'ws';


@WebSocketGateway({ path: '/connecting' })
export class ConnectionsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger(ConnectionsGateway.name);

  afterInit() {
    this.logger.debug('.afterInit()');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(JSON.stringify({
      event: 'new connection',
      client: Object.keys(client),
      args: args.map(Object.keys),
    }, null, 4));
  }

  handleDisconnect(client: any) {
    this.logger.debug(JSON.stringify({
      event: 'client is disconnected',
      client: Object.keys(client),
    }, null, 4));
  }
}
