import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ChatikAuthService } from '../chatik-auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: ChatikAuthService) {
    super();
  }

  // TODO add type of validated data for jwt after success login
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      email, password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
