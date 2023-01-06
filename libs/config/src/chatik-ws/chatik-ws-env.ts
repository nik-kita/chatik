import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { FullConfig } from '../full-config';
import { PgDbEnv } from '../common/pg-db-env';

export class ChatikWsEnv extends IntersectionType(
  PickType(FullConfig, [
    'NODE_ENV',
    'WS_PORT',
  ]),
  PgDbEnv,
) { }
