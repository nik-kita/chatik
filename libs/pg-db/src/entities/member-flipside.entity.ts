import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPgMemberFlipside, PgRoomTypeEnum } from '../../../types/src/pg';

@Entity({ name: 'member_flipside' })
export class MemberFlipsideEntity implements IPgMemberFlipside {
  @PrimaryGeneratedColumn('uuid')
  member_flipside_id: string;

  @Column({ type: 'uuid' })
  flipside_id: string;

  @Column({ type: 'enum', enum: PgRoomTypeEnum })
  flipside_type: PgRoomTypeEnum;

  @Column({ type: 'uuid', nullable: true, foreignKeyConstraintName: 'fk_flipside_user_user_id' })
  flipside_user_id: string | null;

  @Column({ type: 'uuid', foreignKeyConstraintName: 'fk_user_user_id' })
  user_id: string;

  @Column({ type: 'uuid', foreignKeyConstraintName: 'fk_member_member_id' })
  member_id: string;

  @Column({ type: 'uuid', foreignKeyConstraintName: 'fk_room_room_id' })
  room_id: string;
}
