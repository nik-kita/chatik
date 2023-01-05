import { Module } from '@nestjs/common';
import { ReqDtosService } from './req-dtos.service';

@Module({
  providers: [ReqDtosService],
  exports: [ReqDtosService],
})
export class ReqDtosModule {}
