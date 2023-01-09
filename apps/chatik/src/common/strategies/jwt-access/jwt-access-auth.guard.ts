import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_ACCESS_STRATEGY_NAME } from './jwt-access-strategy-name.const';


@Injectable()
export class JwtAccessAuthGuard extends AuthGuard(JWT_ACCESS_STRATEGY_NAME) { }
