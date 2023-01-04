import { Module } from '@nestjs/common';
import { ChatikWsController } from './chatik-ws.controller';
import { ChatikWsService } from './chatik-ws.service';

@Module({
  imports: [],
  controllers: [ChatikWsController],
  providers: [ChatikWsService],
})
export class ChatikWsModule {}
