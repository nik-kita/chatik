import { Module } from '@nestjs/common';
import { OneToOneGate } from './one-to-one-gate.gateway';
import { CommonModule } from '../../common/common.module';
import { OneToOneService } from './one-to-one.service';

@Module({
  imports: [CommonModule],
  providers: [
    OneToOneService,
    OneToOneGate,
  ],
})
export class OneToOneModule {}
