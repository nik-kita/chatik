import { Module } from '@nestjs/common';
import { TypesService } from './types.service';

@Module({
  providers: [TypesService],
  exports: [TypesService],
})
export class TypesModule {}
