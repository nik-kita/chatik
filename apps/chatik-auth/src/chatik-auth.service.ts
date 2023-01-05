import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPgRepo } from '@app/pg-db';

@Injectable()
export class ChatikAuthService {
  constructor(private readonly userRepo: UserPgRepo) {}

  async register(data: {
    email: string,
    password: string,
  }) {
    const insertRes = await this.userRepo.insert(data);

    return insertRes;
  }

  async login(data: {
    email: string,
    password: string,
  }) {
    const { email, password } = data;
    const user = await this.userRepo.getByEmail(email);

    // TODO hash passwords
    if (user && user.password === password) {
      return 'welcome!';
    }

    throw new UnauthorizedException();
  }


  getHello(): string {
    return 'ChatikAuth: "Hello World!"';
  }
}
