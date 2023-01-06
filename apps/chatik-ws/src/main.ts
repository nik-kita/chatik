import { NestFactory } from '@nestjs/core';
import { ChatikWsModule } from './chatik-ws.module';
import { ChatikWsEnv } from '@app/config/chatik-ws';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const chatikWsBoolLogger = new Logger('ChatikWs bootstrap');
  const app = await NestFactory.create(ChatikWsModule);
  const config = app.get<ConfigService<ChatikWsEnv>>(ConfigService);
  const port = config.get('WS_PORT');

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(port);
  chatikWsBoolLogger.debug(`ChatikWs app listen on ${await app.getUrl()}`);
}

bootstrap();
