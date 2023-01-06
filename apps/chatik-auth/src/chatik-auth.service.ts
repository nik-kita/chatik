import { UserEntity, UserPgRepo } from '@app/pg-db';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class ChatikAuthService {
  constructor(
    private readonly userRepo: UserPgRepo,
    private readonly jwt: JwtService,
  ) { }

  async register(data: {
    email: string,
    password: string,
  }) {
    const insertRes = await this.userRepo.insert(data);

    return insertRes;
  }

  async login(userJwtPayload: Pick<UserEntity, 'user_id'>) {
    return {
      access: await this.jwt.signAsync(userJwtPayload),
      refresh: await this.jwt.signAsync(userJwtPayload),
    };
  }

  async validateUser(data: {
    email: string,
    password: string,
  }) {
    const { email, password } = data;
    const user = await this.userRepo.getByEmail(email, ['user_id', 'password']);

    // TODO hash passwords
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ..._user } = user;

      return _user;
    }

    return null;
  }


  getHello(): string {
    return 'ChatikAuth: "Hello World!"';
  }
}
