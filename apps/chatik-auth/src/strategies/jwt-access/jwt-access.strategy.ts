import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ChatikAuthEnv } from '@app/config/chatik-auth';
import { JWT_ACCESS_STRATEGY_NAME } from '../strategy-names.const';


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

  // TODO add payload's type of jwt access
  async validate(payload: any) {
    return payload;
  }
}
