import { IPgRoom } from './pg-room.interface';

export interface IPgMessage extends Pick<IPgRoom, 'room_id'> {
  message_id: string;
  text: string;
}
