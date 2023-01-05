import { NestFactory } from '@nestjs/core';
import { ChatikAuthModule } from './chatik-auth.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatikAuthModule);
  await app.listen(3000);
}
bootstrap();
