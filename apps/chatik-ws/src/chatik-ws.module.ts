import { ChatikWsConfigModule, ChatikWsEnv } from '@app/config/chatik-ws';
import { MessageEntity, MessagePgRepo, PgDbModule, UserEntity, UserPgRepo } from '@app/pg-db';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesGateway } from './gateways/messages.gateway';
import { ConnectedSocketManager } from './services/connected-socket-manager';
import { OnlyAuthHandleConnectionService } from './services/only-auth-handle-connection.service';

@Module({
  imports: [
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
        }
      },
    }),
  ],
  providers: [
    MessagesGateway,
    OnlyAuthHandleConnectionService,
    ConnectedSocketManager,
    UserPgRepo,
    MessagePgRepo,
  ],
})
export class ChatikWsModule { }
