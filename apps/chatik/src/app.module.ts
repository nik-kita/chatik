import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatikConfigModule } from '@app/config/chatik';
import { PgDbModule, UserEntity } from '@app/pg-db';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ChatikConfigModule, PgDbModule, TypeOrmModule.forFeature([
    UserEntity,
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
