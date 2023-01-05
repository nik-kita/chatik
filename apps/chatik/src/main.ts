import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ChatikEnv } from '@app/config/chatik';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const bootLogger = new Logger('Chatik bootstrap')
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<ChatikEnv>>(ConfigService);
  const port = config.get('CHATIK_PORT');

  await app.listen(port);

  bootLogger.debug(`Chatik app listen on ${await app.getUrl()}`);
}

bootstrap();
