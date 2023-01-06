import { MessageEntity } from '../entities';
import { PgRepo } from './base.pg-repo';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class MessagePgRepo extends PgRepo<MessageEntity, 'message_id'> {
  protected constructor(
    @InjectRepository(MessageEntity)
    protected repo: Repository<MessageEntity>,
  ) {
    super(repo, 'message_id');
  }

}
