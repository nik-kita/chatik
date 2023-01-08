import { HttpStatus, Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { ConnectedSocketManager } from './services/connected-socket-manager';
import { OnlyAuthHandleConnectionService } from './services/only-auth-handle-connection.service';
import { WsExceptionFilter } from './exceptions/ws-exception.filter';
import { UnAuthConnectionWsException } from './exceptions/unauth-connection.ws-exception';




@WebSocketGateway()
@UseFilters(WsExceptionFilter)
export abstract class ConnectionGate implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    protected onlyAuthGuard: OnlyAuthHandleConnectionService,
    protected connectedSocketManager: ConnectedSocketManager,
    protected logger: Logger,
    protected wsExceptionFilter: WsExceptionFilter,
  ) { }

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.debug('.afterInit()');
  }

  async handleConnection(client: WebSocket, firstArg = {}) {
    try {
      const payload = await this.onlyAuthGuard.verifyUserFromBearer(firstArg);

      this.connectedSocketManager.insert(payload.user_id, client);
      this.logger.debug({
        event: 'new connection',
        user_id: payload.user_id,
      });
    } catch (error) {
      if (error instanceof UnAuthConnectionWsException) {
        this.wsExceptionFilter.catch(error, {
          switchToWs: () => ({
            getClient: () => client,
          }),
        } as any);

        return;
      }

      client.close(HttpStatus.INTERNAL_SERVER_ERROR + 4_000, JSON.stringify({
        event: 'Error',
        data: {
          name: 'Internal server error',
          message: 'Fail to connect by unknown reason',
        },
      }));

      throw error;
    }
  }

  handleDisconnect(client: any) {
    this.logger.debug({
      event: 'disconnect',
      user_id: this.connectedSocketManager.rmByWs(client),
    });
  }
}
