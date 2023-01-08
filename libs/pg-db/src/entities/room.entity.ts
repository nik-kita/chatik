import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPgRoom } from '../../../types/src/pg/entity-interfaces/pg-room.interface';
import { PgRoomTypeEnum } from '../../../types/src/pg/enums/pg-room-type.enum';


@Entity({ name: 'room' })
export class RoomEntity implements IPgRoom {
  @PrimaryGeneratedColumn('uuid')
  room_id: string;

  @Column({
    enum: PgRoomTypeEnum,
    nullable: false,
  })
  type: PgRoomTypeEnum;
}
