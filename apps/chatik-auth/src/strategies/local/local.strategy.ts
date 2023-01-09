import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ChatikAuthService } from '../../chatik-auth.service';
import { UserEntity } from '@app/pg-db';
import { LOCAL_STRATEGY_NAME } from './local-strategy-name.const';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY_NAME) {
  constructor(private authService: ChatikAuthService) {
    super({
      usernameField: 'email' satisfies keyof UserEntity,
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({
      email, password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
