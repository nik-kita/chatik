import { PickType } from '@nestjs/mapped-types';
import { FullConfig } from '../full-config';

export class ChatikAuthEnv extends PickType(FullConfig, [
  'NODE_ENV',
  'AUTH_PORT',
]) {}
