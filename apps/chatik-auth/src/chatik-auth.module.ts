import { ChatikAuthConfigModule } from '@app/config/chatik-auth';
import { PgDbModule, UserEntity, UserPgRepo } from '@app/pg-db';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatikAuthController } from './chatik-auth.controller';
import { ChatikAuthService } from './chatik-auth.service';
import { LocalStrategy } from './strategies/local/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh/jwt-refresh.strategy';

@Module({
  imports: [
    ChatikAuthConfigModule,
    PgDbModule,
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule,
  ],
  providers: [
    ChatikAuthService,
    UserPgRepo,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [ChatikAuthController],
})
export class ChatikAuthModule {}
