import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, MessageBody, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { GateEvent } from '../../../../../libs/decorators/src';
import { ReceiveMessageGateClientDto, SendMessageGateDto, SendMessageStatusGateClientDto } from '../../../../../libs/dto/src/ws';
import { IMessageGate, StatusForSender } from '../../../../../libs/types/src/ws';
import { ConnectionGate } from '../../common/connection-gate.gateway';
import { WsExceptionFilter } from '../../common/exceptions/ws-exception.filter';
import { ConnectedSocketManager } from '../../common/services/connected-socket-manager';
import { WsJwtAccessGuard } from '../../common/services/ws-jwt-access.guard';


@WebSocketGateway()
@UseFilters(WsExceptionFilter)
export class OneToOneGate extends ConnectionGate implements IMessageGate {
  constructor(
    protected wsJwtAccessGuard: WsJwtAccessGuard,
    protected connectedSocketManager: ConnectedSocketManager,
  ) {
    super(
      wsJwtAccessGuard,
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
