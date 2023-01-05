import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { PgRepo } from './base.pg-repo';
import { Repository } from 'typeorm';

export class UserPgRepo extends PgRepo<UserEntity, 'user_id'> {
  protected constructor(
    @InjectRepository(UserEntity)
    repo: Repository<UserEntity>,
  ) {
    super(repo, 'user_id');
  }
}
