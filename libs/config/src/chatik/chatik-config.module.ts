import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { genConfigOptions } from '../gen-config-options';
import { ChatikEnv } from './chatik-env';

@Module({
  imports: [ConfigModule.forRoot(genConfigOptions(ChatikEnv))],
})
export class ChatikConfigModule {}
