import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { genConfigOptions } from '../gen-config-options';
import { ChatikWsEnv } from './chatik-ws-env';

@Module({
  imports: [ConfigModule.forRoot(genConfigOptions(ChatikWsEnv))],
})
export class ChatikWsConfigModule {}
