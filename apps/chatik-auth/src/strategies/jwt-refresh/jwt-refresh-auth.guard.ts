import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH_STRATEGY_NAME } from '../strategy-names.const';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(JWT_REFRESH_STRATEGY_NAME) { }
