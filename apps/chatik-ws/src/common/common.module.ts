import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatikWsConfigModule, ChatikWsEnv } from '../../../../libs/config/src/chatik-ws';
import { MemberPgRepo, MessageEntity, MessagePgRepo, PgDbModule, UserEntity, UserPgRepo } from '../../../../libs/pg-db/src';
import { OnlyAuthHandleConnectionService } from './services/only-auth-handle-connection.service';
import { ConnectedSocketManager } from './services/connected-socket-manager';
import { MemberEntity } from '../../../../libs/pg-db/src/entities/member.entity';
import { WsExceptionFilter } from './exceptions/ws-exception.filter';

const SHARING_PROVIDERS = [
  OnlyAuthHandleConnectionService,
  ConnectedSocketManager,
  MessagePgRepo,
  MemberPgRepo,
  UserPgRepo,
  WsExceptionFilter,
];
const SHARING_MODULES = [
  ChatikWsConfigModule,
  PgDbModule,
  TypeOrmModule.forFeature([
    UserEntity,
    MessageEntity,
    MemberEntity,
  ]),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory(config: ConfigService<ChatikWsEnv>) {
      return {
        secret: config.get('JWT_ACCESS_SECRET'),
        verifyOptions: {
          ignoreExpiration: false,
        }
      };
    },
  }),
];

@Module({
  imports: SHARING_MODULES,
  providers: SHARING_PROVIDERS,
  exports: [...SHARING_MODULES, ...SHARING_PROVIDERS],
})
export class CommonModule { }
