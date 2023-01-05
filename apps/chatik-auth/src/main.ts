import { ChatikAuthEnv } from '@app/config/chatik-auth';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ChatikAuthModule } from './chatik-auth.module';

async function bootstrap() {
  const chatikAuthBootLogger = new Logger('ChatikAuth bootstrap');
  const app = await NestFactory.create(ChatikAuthModule);
  const config = app.get<ConfigService<ChatikAuthEnv>>(ConfigService);
  const port = config.get('AUTH_PORT');

  await app.listen(port);
  chatikAuthBootLogger.debug(`ChatikAuth app listen on ${await app.getUrl()}`);
}

bootstrap();
