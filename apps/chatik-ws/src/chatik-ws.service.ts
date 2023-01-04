import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatikWsService {
  getHello(): string {
    return 'Hello World!';
  }
}
