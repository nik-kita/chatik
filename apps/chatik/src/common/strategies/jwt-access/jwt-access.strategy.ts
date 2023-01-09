import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ChatikAuthEnv } from '@app/config/chatik-auth';
import { Injectable } from '@nestjs/common';
import { JwtAccessPayload } from '../../../../../../libs/types/src';
import { JWT_ACCESS_STRATEGY_NAME } from './jwt-access-strategy-name.const';


@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JWT_ACCESS_STRATEGY_NAME) {
  constructor(
    private config: ConfigService<ChatikAuthEnv>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtAccessPayload) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user_id, ..._ } = payload;

    return { user_id };
  }
}
