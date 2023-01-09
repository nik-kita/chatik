import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_REFRESH_STRATEGY_NAME } from './jwt-refresh-strategy-name.const';


@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(JWT_REFRESH_STRATEGY_NAME) { }
