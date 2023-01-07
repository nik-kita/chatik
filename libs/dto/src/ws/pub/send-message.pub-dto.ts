import { WsAuthClient } from '../../../../types/src';
import { SendMessageSubDto } from '../sub/send-message.sub-dto';

export class SendMessagePubDto implements Pick<SendMessageSubDto, 'text'> {
  text: string;

  from: string;

  static send(sender: WsAuthClient, text: string) {
    return JSON.stringify({
      event: 'SendMessagePub', // TODO declare types (enum)
      data: {
        from: sender.userId,
        text,
      },
    });
  }
}

