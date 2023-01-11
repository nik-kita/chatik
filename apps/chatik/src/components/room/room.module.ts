import { Module } from '@nestjs/common';
import { MemberPgRepo, RoomPgRepo, UserPgRepo } from '../../../../../libs/pg-db/src';
import { CommonModule } from '../../common/common.module';
import { RoomController } from './room.controller';

@Module({
  imports: [CommonModule],
  providers: [
    MemberPgRepo,
    RoomPgRepo,
    UserPgRepo,
  ],
  controllers: [RoomController],
})
export class RoomModule {}
