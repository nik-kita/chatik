import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, MessageBody, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { SubMessage } from '../../../../libs/decorators/src';
import { IMessageGateway, MessageGatewayEvent } from '../../../../libs/types/src';
import { ConnectedSocketManager } from '../services/connected-socket-manager';
import { OnlyAuthHandleConnectionService } from '../services/only-auth-handle-connection.service';
import { SendMessageSubDto } from '../sub-dtos/send-message.sub-dto';
import { ConnectionsGateway } from './connections.gateway';


@WebSocketGateway()
@UsePipes(new ValidationPipe())
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
  [MessageGatewayEvent.SEND_MESSAGE](
    @MessageBody() body: SendMessageSubDto,
    @ConnectedSocket() ws: WebSocket,
  ) {
    this.logger.debug(body);
    ws.send('ok');
  }
}
