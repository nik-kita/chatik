import { Controller, Get } from '@nestjs/common';
import { ChatikWsService } from './chatik-ws.service';

@Controller()
export class ChatikWsController {
  constructor(private readonly chatikWsService: ChatikWsService) {}

  @Get()
  getHello(): string {
    return this.chatikWsService.getHello();
  }
}
