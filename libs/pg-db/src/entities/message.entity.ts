import { IPgMessage } from '../../../types/src/pg-entities/pg-message.interface';
import { PrimaryGeneratedColumn, Column } from 'typeorm';



export class MessageEntity implements IPgMessage {
  @PrimaryGeneratedColumn('uuid')
  message_id: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;
}
