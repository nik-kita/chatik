import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { SubMessage } from '../../../../libs/decorators/src';
import { IMessageGateway } from '../../../../libs/types/src';
import { ConnectedSocketManager } from '../services/connected-socket-manager';
import { SendMessageSubDto } from '../sub-dtos/send-message.sub-dto';


@WebSocketGateway({ path: 'messages' })
export class MessagesGateway implements IMessageGateway {
  constructor(private connectedSocketManager: ConnectedSocketManager) { }

  private logger = new Logger(MessagesGateway.name);

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
