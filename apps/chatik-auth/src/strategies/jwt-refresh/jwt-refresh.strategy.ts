import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ChatikAuthEnv } from '@app/config/chatik-auth';
import { JWT_REFRESH_STRATEGY_NAME } from '../strategy-names.const';


export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_REFRESH_STRATEGY_NAME) {
  constructor(
    private config: ConfigService<ChatikAuthEnv>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
    });
  }

  // TODO add payload's type of jwt access
  async validate(payload: any) {
    return payload;
  }
}
