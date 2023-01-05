import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { genConfigOptions } from '../gen-config-options';
import { ChatikAuthEnv } from './chatik-auth-env';

@Module({
  imports: [ConfigModule.forRoot(genConfigOptions(ChatikAuthEnv))],
})
export class ChatikAuthConfigModule {}
