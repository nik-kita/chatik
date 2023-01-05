import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatikConfigModule } from '@app/config/chatik';

@Module({
  imports: [ChatikConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
