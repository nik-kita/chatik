import { Module } from '@nestjs/common';
import { ChatikAuthController } from './chatik-auth.controller';
import { ChatikAuthService } from './chatik-auth.service';
import { ChatikAuthConfigModule } from '@app/config/chatik-auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgDbModule, UserEntity, UserPgRepo } from '@app/pg-db';

@Module({
  imports: [ChatikAuthConfigModule, PgDbModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [ChatikAuthController],
  providers: [ChatikAuthService, UserPgRepo],
})
export class ChatikAuthModule {}
