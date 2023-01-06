import { Module } from '@nestjs/common';
import { ChatikWsConfigModule } from '@app/config/chatik-ws';

@Module({
  imports: [ChatikWsConfigModule],
  providers: [],
})
export class ChatikWsModule {}
