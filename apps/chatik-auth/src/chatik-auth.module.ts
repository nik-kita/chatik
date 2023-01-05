import { Module } from '@nestjs/common';
import { ChatikAuthController } from './chatik-auth.controller';
import { ChatikAuthService } from './chatik-auth.service';
import { ChatikAuthConfigModule } from '@app/config/chatik-auth';

@Module({
  imports: [ChatikAuthConfigModule],
  controllers: [ChatikAuthController],
  providers: [ChatikAuthService],
})
export class ChatikAuthModule {}
