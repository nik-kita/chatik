import { Module } from '@nestjs/common';
import { ChatikAuthController } from './chatik-auth.controller';
import { ChatikAuthService } from './chatik-auth.service';
import { ChatikAuthConfigModule } from '@app/config/chatik-auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgDbModule, UserEntity, UserPgRepo } from '@app/pg-db';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy';

@Module({
  imports: [
    ChatikAuthConfigModule,
    PgDbModule,
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  ],
  providers: [ChatikAuthService, UserPgRepo, LocalStrategy],
  controllers: [ChatikAuthController],
})
export class ChatikAuthModule {}
