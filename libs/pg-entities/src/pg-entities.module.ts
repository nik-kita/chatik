import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PgEntitiesConfigModule, PgEntitiesEnv } from '@app/config/pg-entities';

@Module({
  imports: [PgEntitiesConfigModule, TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory(config: ConfigService<PgEntitiesEnv>): TypeOrmModuleOptions {

      return {
        type: 'postgres',
        host: config.get('PG_HOST'),
        port: config.get('PG_PORT'),
        username: config.get('PG_USER'),
        password: config.get('PG_PASSWORD'),
        database: config.get('PG_DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      };
    },
  })],
})
export class PgEntitiesModule {}
