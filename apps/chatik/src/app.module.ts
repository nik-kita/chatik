import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatikConfigModule } from '../../../libs/config/src/chatik';
import { RoomModule } from './components/room/room.module';

@Module({
  imports: [
    ChatikConfigModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
