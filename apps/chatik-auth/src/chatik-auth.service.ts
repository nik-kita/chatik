import { UserEntity, UserPgRepo } from '@app/pg-db';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChatikAuthEnv } from '../../../libs/config/src/chatik-auth';


@Injectable()
export class ChatikAuthService {
  constructor(
    private readonly userRepo: UserPgRepo,
    private readonly jwt: JwtService,
    private readonly config: ConfigService<ChatikAuthEnv>,
  ) { }

  async register(data: {
    email: string,
    password: string,
  }) {
    const insertRes = await this.userRepo.insert(data);

    return insertRes;
  }

  private async generateJwtTokensPair(userJwtPayload: Pick<UserEntity, 'user_id'>) {
    const [access, refresh] = await Promise.all([
      this.jwt.signAsync(userJwtPayload, {
        secret: this.config.get('JWT_ACCESS_SECRET'),
        expiresIn: '1m',
      }),
      this.jwt.signAsync(userJwtPayload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: '3d',
      }),
    ]);

    return {
      access,
      refresh,
    };
  }

  async login(userJwtPayload: Pick<UserEntity, 'user_id'>) {
    return this.generateJwtTokensPair(userJwtPayload);
  }

  async refresh(userJwtPayload: Pick<UserEntity, 'user_id'>) {
    return this.generateJwtTokensPair(userJwtPayload);
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
