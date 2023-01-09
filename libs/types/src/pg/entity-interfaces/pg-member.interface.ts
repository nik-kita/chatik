import { IPgUser } from './pg-user.interface';
import { IPgRoom } from './pg-room.interface';

export interface IPgMember extends Pick<IPgUser, 'user_id'>,
  Pick<IPgRoom, 'room_id'> {
  member_id: string;
}
