import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, MessageBody, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { GateEvent } from '../../../../libs/decorators/src';
import { IMessageGate } from '../../../../libs/types/src';
import { SendMessagePubDto } from '../pub-dtos/send-message.pub-dto';
import { ConnectedSocketManager } from '../services/connected-socket-manager';
import { OnlyAuthHandleConnectionService } from '../services/only-auth-handle-connection.service';
import { SendMessageSubDto } from '../sub-dtos/send-message.sub-dto';
import { ConnectionsGateway } from './connections.gateway';


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

    if (receiver) {
      receiver.ws.send(SendMessagePubDto.send(sender, text));
    } else {
      /**
       * // TODO
       * here we should make
       * push notification logic
       * for offline user
       */
    }
  }
}
