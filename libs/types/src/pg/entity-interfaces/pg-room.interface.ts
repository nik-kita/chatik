import { PgRoomTypeEnum } from '../enums/pg-room-type.enum';

export interface IPgRoom {
  room_id: string;
  type: PgRoomTypeEnum;
}
