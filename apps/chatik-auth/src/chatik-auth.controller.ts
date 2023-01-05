import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatikAuthService } from './chatik-auth.service';

@Controller('auth')
export class ChatikAuthController {
  constructor(
    private readonly chatikAuthService: ChatikAuthService,
  ) {}

  @Post('register')
  register(
    @Body() body: {
      email: string,
      password: string,
    }, // TODO add DTO
  ) {
    return this.chatikAuthService.register(body);
  }

  @Post('login')
  login(
    @Body() body: {
      email: string,
      password: string,
    },
  ) {
    return this.chatikAuthService.login(body);
  }

  @Get()
  getHello(): string {
    return this.chatikAuthService.getHello();
  }
}
