import { Module } from '@nestjs/common';
import { OneToOneModule } from './components/one-to-one/one-to-one.module';

@Module({
  imports: [
    OneToOneModule,
  ],
})
export class ChatikWsModule { }
