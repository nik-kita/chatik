import { MessageEntity } from '../../../../pg-db/src';
import { GateClientEvent, StatusForSender } from '../../../../types/src';
import { GateClientDto } from './gate-client-dto';


type SendType =   {
  status: StatusForSender,
  message_id: MessageEntity['message_id'],
};
export class SendMessageStatusGateClientDto extends GateClientDto<SendType>{
  protected generateJson(data) {
    return {
      event: GateClientEvent.RECEIVE_SEND_MESSAGE_STATUS,
      data,
    };
  }

  public static generate(data: SendType) {
    return new SendMessageStatusGateClientDto().jsonToString(data);
  }
}
