import { ChatikAuthEnv } from '@app/config/chatik-auth';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { JWT_REFRESH_STRATEGY_NAME } from '../strategy-names.const';
import { JwtRefreshPayload } from '../../../../../libs/types/src';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_REFRESH_STRATEGY_NAME) {
  constructor(
    private config: ConfigService<ChatikAuthEnv>,
  ) {
    super({
      jwtFromRequest: (req: Request) => req.body.refresh?.split('Bearer ').at(1),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: JwtRefreshPayload) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user_id, ..._ } = payload;

    return { user_id };
  }
}
