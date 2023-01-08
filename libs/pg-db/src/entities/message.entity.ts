import { IPgMessage } from '../../../types/src/pg';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';



@Entity({ name: 'message' })
export class MessageEntity implements IPgMessage {
  @PrimaryGeneratedColumn('uuid')
  message_id: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ type: 'uuid', nullable: false, foreignKeyConstraintName: 'fk_user_user_id' })
  user_id: string;

  @Column({ type: 'uuid', nullable: false, foreignKeyConstraintName: 'fk_room_room_id' })
  room_id: string;
}
