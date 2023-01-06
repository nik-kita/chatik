import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ConnectedSocketManager } from '../services/connected-socket-manager';
import { SubMessage } from '../../../../libs/decorators/src';
import { Logger } from '@nestjs/common';
import { WebSocket } from 'ws';
import { IMessageGateway } from '../../../../libs/types/src';


@WebSocketGateway({ path: 'messages' })
export class MessagesGateway implements IMessageGateway {
  constructor(private connectedSocketManager: ConnectedSocketManager) { }

  private logger = new Logger(MessagesGateway.name);

  @SubMessage()
  // TODO add dto
  ['on-send-message'](
    @MessageBody() body: any,
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
