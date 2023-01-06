import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { FullConfig } from '../full-config';
import { PgEntitiesEnv } from '../common/pg-db-env';

export class ChatikAuthEnv extends IntersectionType(
  PgEntitiesEnv,
  PickType(FullConfig, [
    'NODE_ENV',
    'AUTH_PORT',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
  ]),
) { }
