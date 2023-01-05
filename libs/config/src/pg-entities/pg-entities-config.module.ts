import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { genConfigOptions } from '../gen-config-options';
import { PgEntitiesEnv } from './pg-entities-env';

@Module({
  imports: [ConfigModule.forRoot(genConfigOptions(PgEntitiesEnv))],
})
export class PgEntitiesConfigModule {}
