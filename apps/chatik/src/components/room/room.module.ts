import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { MemberFlipsidePgRepo, MemberPgRepo, RoomPgRepo, UserPgRepo } from '../../../../../libs/pg-db/src';
import { RoomController } from './room.controller';

@Module({
  imports: [CommonModule],
  providers: [
    MemberPgRepo,
    RoomPgRepo,
    UserPgRepo,
    MemberFlipsidePgRepo,
  ],
  controllers: [RoomController],
})
export class RoomModule {}
