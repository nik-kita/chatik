import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, MessageBody, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { GateEvent } from '../../../../libs/decorators/src';
import { IMessageGate, StatusForSender } from '../../../../libs/types/src';
import { ConnectedSocketManager } from '../services/connected-socket-manager';
import { OnlyAuthHandleConnectionService } from '../services/only-auth-handle-connection.service';
import { ConnectionsGateway } from './connections.gateway';
import { SendMessageGateClientDto, SendMessageStatusGateClientDto, SendMessageGateDto } from '../../../../libs/dto/src/ws';


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
    @MessageBody() { text, to }: SendMessageGateDto,
    @ConnectedSocket() ws: WebSocket,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sender = this.connectedSocketManager.getByWs(ws)!;
    const receiver = this.connectedSocketManager.getByUserId(to);
    let resStatus = StatusForSender.SENDING;

    if (receiver) {
      receiver.ws.send(SendMessageGateClientDto.send(sender, text));
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
    sender.ws.send(SendMessageStatusGateClientDto.send(resStatus));
  }
}
