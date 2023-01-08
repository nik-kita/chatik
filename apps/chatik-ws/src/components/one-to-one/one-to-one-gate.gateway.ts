import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, MessageBody, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { GateEvent } from '../../../../../libs/decorators/src';
import { ReceiveMessageGateClientDto, SendMessageGateDto, SendMessageStatusGateClientDto } from '../../../../../libs/dto/src/ws';
import { MessagePgRepo } from '../../../../../libs/pg-db/src';
import { IMessageGate, StatusForSender } from '../../../../../libs/types/src';
import { ConnectionGate } from '../../common/connection-gate.gateway';
import { OnlyAuthHandleConnectionService } from '../../common/services/only-auth-handle-connection.service';
import { ConnectedSocketManager } from '../../common/services/connected-socket-manager';


@WebSocketGateway()
export class OneToOneGate extends ConnectionGate implements IMessageGate {
  constructor(
    protected onlyAuthGuard: OnlyAuthHandleConnectionService,
    protected connectedSocketManager: ConnectedSocketManager,
    protected messageRepo: MessagePgRepo,
  ) {
    super(
      onlyAuthGuard,
      connectedSocketManager,
      new Logger(OneToOneGate.name),
    );
  }

  @GateEvent()
  @UsePipes(ValidationPipe)
  async sendMessage(
    @MessageBody() { text, to }: SendMessageGateDto,
    @ConnectedSocket() ws: WebSocket,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sender = this.connectedSocketManager.getByWs(ws)!;
    const receiver = this.connectedSocketManager.getByUserId(to);
    let status = StatusForSender.SENDING;

    if (receiver) {
      receiver.ws.send(ReceiveMessageGateClientDto.generate(sender, text));
      status = StatusForSender.READ;
    } else {
      /**
       * // TODO
       * here we should make
       * push notification logic
       * for offline user
       */
      status = StatusForSender.SENT;
    }

    // const { message_id } = await this.messageRepo.insert({
    //   text,
    //   user_id: sender.userId,
    // });


    sender.ws.send(SendMessageStatusGateClientDto.generate({
      message_id: '// TODO replace with real message_id',
      status,
    }));
  }
}
