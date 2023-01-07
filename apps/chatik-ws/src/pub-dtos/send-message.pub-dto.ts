import { WsAuthClient } from '../../../../libs/types/src';
import { SendMessageSubDto } from '../sub-dtos/send-message.sub-dto';

export class SendMessagePubDto implements Pick<SendMessageSubDto, 'text'> {
  text: string;

  from: string;

  static send(sender: WsAuthClient, text: string) {
    return JSON.stringify({
      from: sender.userId,
      text,
    });
  }
}

