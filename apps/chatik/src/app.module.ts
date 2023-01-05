import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatikConfigModule } from '@app/config/chatik';
import { PgEntitiesModule, UserEntity } from '@app/pg-entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ChatikConfigModule, PgEntitiesModule, TypeOrmModule.forFeature([
    UserEntity,
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
