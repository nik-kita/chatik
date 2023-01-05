import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { PgRepo } from './base.pg-repo';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class UserPgRepo extends PgRepo<UserEntity, 'user_id'> {
  public constructor(
    @InjectRepository(UserEntity)
    repo: Repository<UserEntity>,
  ) {
    super(repo, 'user_id');
  }

  getByEmail<S extends (keyof UserEntity)[]>(
    email: string,
    select = ['email', 'password', 'user_id'] as S, // TODO check is type correctly help define keys for result
  ) {
    return this.repo.findOne({
      where: { email },
      select,
    }) as Promise<Exclude<UserEntity, S> | null>;
  }
}
