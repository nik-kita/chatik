import { NestFactory } from '@nestjs/core';
import { ChatikWsModule } from './chatik-ws.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatikWsModule);
  await app.listen(3000);
}
bootstrap();
