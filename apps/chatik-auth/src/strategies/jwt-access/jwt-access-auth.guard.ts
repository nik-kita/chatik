import { AuthGuard } from '@nestjs/passport';
import { JWT_ACCESS_STRATEGY_NAME } from '../strategy-names.const';

export class JwtAccessAuthGuard extends AuthGuard(JWT_ACCESS_STRATEGY_NAME) { }
