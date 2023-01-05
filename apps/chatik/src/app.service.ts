import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../libs/pg-entities/src';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  getUsers<W extends FindOptionsWhere<UserEntity>>(where: W, options: {
    select?: (keyof UserEntity)[],
    limit?: number,
    offset?: number,
  } = {}) {
    const {
      select = ['user_id'],
      limit = 10,
      offset = 0,
    } = options;

    return this.userRepo.find({
      where,
      select,
      take: limit,
      skip: offset,
    }) as Promise<Pick<UserEntity, typeof select[number]>[] | null>
  }

  getHello(): string {
    return 'Hello World!';
  }
}
