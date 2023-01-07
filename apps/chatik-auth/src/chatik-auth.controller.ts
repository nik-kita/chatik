import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ChatikAuthService } from './chatik-auth.service';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { JwtRefreshAuthGuard } from './strategies/jwt-refresh/jwt-refresh-auth.guard';
import { LoginResDto, RegisterReqDto } from '../../../libs/dto/src/http';

@Controller('auth')
export class ChatikAuthController {
  constructor(
    private readonly chatikAuthService: ChatikAuthService,
  ) { }

  @Post('register')
  register(
    @Body() body: RegisterReqDto,
  ) {
    return this.chatikAuthService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    // TODO wrap to separate decorator, add types, etc.
    @Request() req,
  ): Promise<LoginResDto> {
    return this.chatikAuthService.login(req.user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  refresh(
    @Request() req,
  ) {
    return this.chatikAuthService.refresh(req.user);
  }

  @Get()
  getHello(): string {
    return this.chatikAuthService.getHello();
  }
}
