import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPgMember, PgRoomTypeEnum } from '../../../types/src/pg';


@Entity({ name: 'member' })
export class MemberEntity implements IPgMember {
  @PrimaryGeneratedColumn('uuid')
  member_id: string;

  @Column({ type: 'uuid', nullable: false, foreignKeyConstraintName: 'fk_user_user_id' })
  user_id: string;

  @Column({ type: 'uuid', nullable: false, foreignKeyConstraintName: 'fk_room_room_id' })
  room_id: string;

  @Column({ type: 'enum', nullable: false, enum: PgRoomTypeEnum })
  room_type: PgRoomTypeEnum;

  @Column({ type: 'uuid', nullable: false })
  flipside_id: string;

  @Column({ type: 'uuid', nullable: true, foreignKeyConstraintName: 'fk_flipside_user_user_id' })
  flipside_user_id: string;
}
