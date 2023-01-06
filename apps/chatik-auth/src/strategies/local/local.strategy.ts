import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ChatikAuthService } from '../../chatik-auth.service';
import { UserEntity } from '@app/pg-db';
import { LOCAL_STRATEGY_NAME } from '../strategy-names.const';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY_NAME) {
  constructor(private authService: ChatikAuthService) {
    super({
      usernameField: 'email' satisfies keyof UserEntity,
    });
  }

  // TODO add type of validated data for jwt after success login
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      email, password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
