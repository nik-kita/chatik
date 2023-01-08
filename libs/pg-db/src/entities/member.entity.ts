import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPgMember } from '../../../types/src/pg/entity-interfaces/pg-member.interface';


@Entity({ name: 'member' })
export class MemberEntity implements IPgMember {
  @PrimaryGeneratedColumn('uuid')
  member_id: string;

  @Column({ type: 'uuid', nullable: false, foreignKeyConstraintName: 'user_user_id' })
  user_id: string;

  @Column({ type: 'uuid', nullable: false, foreignKeyConstraintName: 'user_user_id' })
  room_id: string;
}
