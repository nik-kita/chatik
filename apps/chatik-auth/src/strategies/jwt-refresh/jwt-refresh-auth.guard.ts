import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH_STRATEGY_NAME } from '../strategy-names.const';

export class JwtRefreshAuthGuard extends AuthGuard(JWT_REFRESH_STRATEGY_NAME) { }
