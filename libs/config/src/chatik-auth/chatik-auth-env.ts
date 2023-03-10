import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { FullConfig } from '../full-config';
import { PgDbEnv } from '../common/pg-db-env';

export class ChatikAuthEnv extends IntersectionType(
  PgDbEnv,
  PickType(FullConfig, [
    'NODE_ENV',
    'AUTH_PORT',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
  ]),
) { }
