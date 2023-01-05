import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatikAuthEnv, ChatikAuthConfigModule } from '@app/config/chatik-auth';

async function bootstrap() {
  const chatikAuthBootLogger = new Logger('ChatikAuth bootstrap');
  const app = await NestFactory.create(ChatikAuthConfigModule);
  const config = app.get<ConfigService<ChatikAuthEnv>>(ConfigService);
  const port = config.get('AUTH_PORT');

  await app.listen(port);
  chatikAuthBootLogger.debug(`ChatikAuth app listen on ${await app.getUrl()}`);
}

bootstrap();
