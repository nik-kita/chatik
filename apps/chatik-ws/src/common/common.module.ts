import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatikWsConfigModule, ChatikWsEnv } from '../../../../libs/config/src/chatik-ws';
import { MessageEntity, MessagePgRepo, PgDbModule, UserEntity } from '../../../../libs/pg-db/src';
import { OnlyAuthHandleConnectionService } from './services/only-auth-handle-connection.service';
import { ConnectedSocketManager } from './services/connected-socket-manager';

const SHARING_PROVIDERS = [
  OnlyAuthHandleConnectionService,
  ConnectedSocketManager,
  MessagePgRepo,
];
const SHARING_MODULES = [
  ChatikWsConfigModule,
  PgDbModule,
  TypeOrmModule.forFeature([UserEntity, MessageEntity]),
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
