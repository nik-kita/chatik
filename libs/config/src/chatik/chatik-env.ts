import { PickType } from '@nestjs/mapped-types';
import { FullConfig } from '../full-config';

export class ChatikEnv extends PickType(FullConfig, [
  'NODE_ENV',
  'CHATIK_PORT',
]) {}
