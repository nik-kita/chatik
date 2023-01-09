import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { MemberPgRepo, RoomPgRepo, UserPgRepo } from '../../../../../libs/pg-db/src';

@Module({
  imports: [CommonModule],
  providers: [
    MemberPgRepo,
    RoomPgRepo,
    UserPgRepo,
  ],
})
export class RoomModule {}
