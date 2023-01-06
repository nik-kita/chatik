import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ChatikAuthService } from './chatik-auth.service';
import { RegisterReqDto, LoginReqDto } from '@app/req-dtos/chatik-auth';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(
    // TODO wrap to separate decorator, add types, etc.
    @Request() req,
  ) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.chatikAuthService.getHello();
  }
}
