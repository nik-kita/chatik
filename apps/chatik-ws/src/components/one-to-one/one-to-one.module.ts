import { Module } from '@nestjs/common';
import { OneToOneGate } from './one-to-one-gate.gateway';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [
    OneToOneGate,
  ],
})
export class OneToOneModule {}
