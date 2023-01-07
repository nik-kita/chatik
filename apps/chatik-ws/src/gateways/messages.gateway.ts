import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, MessageBody, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { GateEvent } from '../../../../libs/decorators/src';
import { IMessageGate, StatusForSender } from '../../../../libs/types/src';
import { SendMessagePubDto } from '../pub-dtos/send-message.pub-dto';
import { ConnectedSocketManager } from '../services/connected-socket-manager';
import { OnlyAuthHandleConnectionService } from '../services/only-auth-handle-connection.service';
import { SendMessageSubDto } from '../sub-dtos/send-message.sub-dto';
import { ConnectionsGateway } from './connections.gateway';
import { SendMessageStatusPubDto } from '../pub-dtos/send-message-status.pub-dto';


@WebSocketGateway()
export class MessagesGateway extends ConnectionsGateway implements IMessageGate {
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

  @GateEvent()
  @UsePipes(ValidationPipe)
  sendMessage(
    @MessageBody() { text, to }: SendMessageSubDto,
    @ConnectedSocket() ws: WebSocket,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sender = this.connectedSocketManager.getByWs(ws)!;
    const receiver = this.connectedSocketManager.getByUserId(to);
    let resStatus = StatusForSender.SENDING;

    if (receiver) {
      receiver.ws.send(SendMessagePubDto.send(sender, text));
      resStatus = StatusForSender.READ;
    } else {
      /**
       * // TODO
       * here we should make
       * push notification logic
       * for offline user
       */
      resStatus = StatusForSender.SENT;
    }

    // TODO declare const for event
    sender.ws.send(SendMessageStatusPubDto.send(resStatus));
  }
}
