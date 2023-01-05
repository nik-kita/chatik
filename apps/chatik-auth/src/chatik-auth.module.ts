import { Module } from '@nestjs/common';
import { ChatikAuthController } from './chatik-auth.controller';
import { ChatikAuthService } from './chatik-auth.service';

@Module({
  imports: [],
  controllers: [ChatikAuthController],
  providers: [ChatikAuthService],
})
export class ChatikAuthModule {}
