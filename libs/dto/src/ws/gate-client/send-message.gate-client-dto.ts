import { GateClient } from '../../../../types/src';
import { SendMessageGateDto } from '../gate/send-message.gate-dto';

export class SendMessageGateClientDto implements Pick<SendMessageGateDto, 'text'> {
  text: string;

  from: string;

  static send(sender: GateClient, text: string) {
    return JSON.stringify({
      event: 'SendMessagePub', // TODO declare types (enum)
      data: {
        from: sender.userId,
        text,
      },
    });
  }
}

