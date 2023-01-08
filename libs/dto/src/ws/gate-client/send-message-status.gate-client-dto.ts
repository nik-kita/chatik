import { GateClientEvent, StatusForSender } from '../../../../types/src';
import { GateClientDto } from './gate-client-dto';

export class SendMessageStatusGateClientDto extends GateClientDto<{ status: StatusForSender }>{
  protected generateJson(data) {
    return {
      event: GateClientEvent.RECEIVE_SEND_MESSAGE_STATUS,
      data,
    };
  }

  public static generate(status: StatusForSender) {
    return new SendMessageStatusGateClientDto().jsonToString({
      status,
    });
  }
}
