import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPgUser } from '../../../types/src';

@Entity({ name: 'user' })
export class UserEntity implements IPgUser {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'citext', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
