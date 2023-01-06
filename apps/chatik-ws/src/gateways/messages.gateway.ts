import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ path: 'messages' })
export class MessagesGateway {

  
}
