import { ChatikWsConfigModule, ChatikWsEnv } from '@app/config/chatik-ws';
import { Module } from '@nestjs/common';
import { PgDbModule, UserEntity, UserPgRepo } from '@app/pg-db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionsGateway } from './gateways/connections.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OnlyAuthHandleConnectionService } from './services/only-auth-handle-connection.service';
import { ConnectedSocketManager } from './services/connected-socket-mannager';

@Module({
  imports: [
    ChatikWsConfigModule,
    PgDbModule,
    TypeOrmModule.forFeature([UserEntity]),
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
    ConnectionsGateway,
    OnlyAuthHandleConnectionService,
    ConnectedSocketManager,
    UserPgRepo,
  ],
})
export class ChatikWsModule { }
