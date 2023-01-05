import { Controller, Get } from '@nestjs/common';
import { ChatikAuthService } from './chatik-auth.service';

@Controller()
export class ChatikAuthController {
  constructor(private readonly chatikAuthService: ChatikAuthService) {}

  @Get()
  getHello(): string {
    return this.chatikAuthService.getHello();
  }
}
