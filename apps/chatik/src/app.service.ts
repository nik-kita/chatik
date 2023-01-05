// TODO jest don't see app aliases... should be replaced with @app/pg-db
import { UserPgRepo } from '../../../libs/pg-db/src';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepo: UserPgRepo,
  ) {}

  createUser(email: string, password: string) {
    return this.userRepo.insert({ email, password });
  }

  getFirstIds(pagination: {
    limit?: number,
    skip?: number,
  } = {}) {
    const {
      limit,
      skip,
    } = pagination;

    return this.userRepo.get({}, { limit, skip });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
