import { PickType } from '@nestjs/mapped-types';
import { FullConfig } from '../full-config';

export class PgDbEnv extends PickType(FullConfig, [
  'NODE_ENV',
  'PG_HOST',
  'PG_PORT',
  'PG_PASSWORD',
  'PG_USER',
  'PG_DB_NAME',
]) {}
