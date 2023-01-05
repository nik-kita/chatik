import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { FullConfig } from '../full-config';
import { PgEntitiesEnv } from '../common/pg-db-env';

export class ChatikEnv extends IntersectionType(
  PickType(FullConfig, [
  'NODE_ENV',
  'CHATIK_PORT',
]), PgEntitiesEnv) {}
