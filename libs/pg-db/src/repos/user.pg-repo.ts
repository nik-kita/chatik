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

  getByEmail<S extends (keyof UserEntity)[] = ['user_id']>(
    email: string,
    select: S = ['user_id'] as S,
  ) {
    return this.repo.findOne({
      where: { email },
      select,
    }) as Promise<Pick<UserEntity, S[number]> | null>;
  }
}
