import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatikAuthService {
  getHello(): string {
    return 'ChatikAuth: "Hello World!"';
  }
}
