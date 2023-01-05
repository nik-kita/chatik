import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { FullConfig } from '../full-config';
import { PgEntitiesEnv } from '../common/pg-db-env';

export class ChatikAuthEnv extends IntersectionType(
  PickType(FullConfig, [
  'NODE_ENV',
  'AUTH_PORT',
]), PgEntitiesEnv) {}
