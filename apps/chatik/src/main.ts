import { ChatikEnv } from '@app/config/chatik';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const logger = new Logger('Chatik boot')
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<ChatikEnv>>(ConfigService);
  const port = config.get('CHATIK_PORT');

  await app.listen(port);

  logger.debug(`Chatik app listen on ${await app.getUrl()}`);
}

bootstrap();
