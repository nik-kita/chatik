import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPgRoom, PgRoomTypeEnum } from '../../../types/src/pg';


@Entity({ name: 'room' })
export class RoomEntity implements IPgRoom {
  @PrimaryGeneratedColumn('uuid')
  room_id: string;

  @Column({
    type: 'enum',
    enum: PgRoomTypeEnum,
    nullable: false,
  })
  type: PgRoomTypeEnum;
}
