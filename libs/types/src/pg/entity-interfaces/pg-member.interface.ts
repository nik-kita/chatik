import { IPgUser } from './pg-user.interface';
import { IPgRoom } from './pg-room.interface';
import { PgRoomTypeEnum } from '../enums/pg-room-type.enum';

export interface IPgMember extends Pick<IPgUser, 'user_id'>,
  Pick<IPgRoom, 'room_id'> {
  member_id: string;

  flipside_id: string;

  flipside_type: PgRoomTypeEnum;

  flipside_user_id: string;
}
