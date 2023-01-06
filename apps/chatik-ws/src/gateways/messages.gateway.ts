import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { SubMessage } from '../../../../libs/decorators/src';
import { IMessageGateway } from '../../../../libs/types/src';
import { ConnectedSocketManager } from '../services/connected-socket-manager';
import { SendMessageSubDto } from '../sub-dtos/send-message.sub-dto';
import { ConnectionsGateway } from './connections.gateway';
import { OnlyAuthHandleConnectionService } from '../services/only-auth-handle-connection.service';


@WebSocketGateway()
export class MessagesGateway extends ConnectionsGateway implements IMessageGateway {
  constructor(
    protected onlyAuthGuard: OnlyAuthHandleConnectionService,
    protected connectedSocketManager: ConnectedSocketManager,
  ) {
    super(
      onlyAuthGuard,
      connectedSocketManager,
      new Logger(MessagesGateway.name),
    );
  }

  @SubMessage()
  ['on-send-message'](
    @MessageBody() body: SendMessageSubDto,
    @ConnectedSocket() ws: WebSocket,
  ) {
    const client = this.connectedSocketManager.getByWs(ws);

    this.logger.debug({
      message: body,
      from: client?.userId,
    });
  }

  receiveMessage() {
    // TODO
  }
}
