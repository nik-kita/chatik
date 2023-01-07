import { StatusForSender } from '../../../../types/src';

export class SendMessageStatusPubDto {
  status: StatusForSender;

  public static send(status: StatusForSender) {
    return JSON.stringify({
      sendedMessageStatus: status,
    });
  }
}
