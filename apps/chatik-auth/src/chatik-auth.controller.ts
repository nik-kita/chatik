import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatikAuthService } from './chatik-auth.service';
import { RegisterReqDto, LoginReqDto } from '@app/req-dtos/chatik-auth';

@Controller('auth')
export class ChatikAuthController {
  constructor(
    private readonly chatikAuthService: ChatikAuthService,
  ) {}

  @Post('register')
  register(
    @Body() body: RegisterReqDto,
  ) {
    return this.chatikAuthService.register(body);
  }

  @Post('login')
  login(
    @Body() body: LoginReqDto,
  ) {
    return this.chatikAuthService.login(body);
  }

  @Get()
  getHello(): string {
    return this.chatikAuthService.getHello();
  }
}
