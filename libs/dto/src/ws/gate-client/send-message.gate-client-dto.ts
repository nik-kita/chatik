import { GateClient, GateClientEvent, GateClientMessage } from '../../../../types/src';
import { SendMessageGateDto } from '../gate/send-message.gate-dto';
import { GateClientDto } from './gate-client-dto';

type SendMessageGateClient = Pick<SendMessageGateDto, 'text'> & {
  from: string;
};

export class ReceiveMessageGateClientDto extends GateClientDto<SendMessageGateClient>  {
  protected generateJson(data: SendMessageGateClient): GateClientMessage<SendMessageGateClient> {
    return {
      event: GateClientEvent.RECEIVE_MESSAGE,
      data,
    };
  }


  static generate(sender: GateClient, text: string) {
    return new ReceiveMessageGateClientDto().jsonToString({
      from: sender.userId,
      text,
    });
  }
}

