import { ChatikWsConfigModule } from '@app/config/chatik-ws';
import { Module } from '@nestjs/common';
import { PgDbModule, UserEntity, UserPgRepo } from '@app/pg-db';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ChatikWsConfigModule,
    PgDbModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserPgRepo],
})
export class ChatikWsModule {}
