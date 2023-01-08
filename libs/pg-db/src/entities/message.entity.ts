import { IPgMessage } from '../../../types/src/pg-entities/pg-message.interface';
import { PrimaryGeneratedColumn, Column } from 'typeorm';



export class MessageEntity implements IPgMessage {
  @PrimaryGeneratedColumn('uuid')
  message_id: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ type: 'uuid', nullable: false, foreignKeyConstraintName: 'fk_user_user_id' })
  user_id: string;
}
