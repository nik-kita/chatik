import { StatusForSender } from '../../../../types/src';

export class SendMessageStatusGateClientDto {
  status: StatusForSender;

  public static send(status: StatusForSender) {
    return JSON.stringify({
      event: 'SendMessageStatusPub',
      data: {
        sendedMessageStatus: status,
      },
    });
  }
}
