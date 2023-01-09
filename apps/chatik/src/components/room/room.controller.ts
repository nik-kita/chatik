import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MemberFlipsidePgRepo, MemberPgRepo, RoomPgRepo } from '../../../../../libs/pg-db/src';
import { CreateOneToOneRoomReqDto } from '../../../../../libs/dto/src/http';
import { PgRoomTypeEnum } from '../../../../../libs/types/src/pg';
import { JwtAccessAuthGuard } from '../../common/strategies/jwt-access/jwt-access-auth.guard';


@UseGuards(JwtAccessAuthGuard)
@Controller('room')
export class RoomController {
  constructor(
    private roomRepo: RoomPgRepo,
    private flipsideRepo: MemberFlipsidePgRepo,
    private memberRepo: MemberPgRepo,
  ) { }

  @Post('one-to-one')
  async createOneToOneRoom(
    @Body() { initiatorUserId, flipsideUserId }: CreateOneToOneRoomReqDto,
  ): Promise<{
    room_id: string,
  }> {
    const oldFlipside = await this.flipsideRepo.getOne({
      user_id: initiatorUserId,
      flipside_id: flipsideUserId,
    }, ['room_id', 'member_flipside_id']);

    if (!oldFlipside) {
      const { room_id } = await this.roomRepo.insert({
        type: PgRoomTypeEnum.ONE_TO_ONE,
      });

      // TODO check is it safe to skip awaiting these insertions
      void this.memberRepo.insertMany([
        { user_id: initiatorUserId, room_id },
        { user_id: flipsideUserId, room_id },
      ]).then(([initiator, flipsideMember]) => {
        this.flipsideRepo.insertMany([
          {
            user_id: initiatorUserId,
            flipside_id: flipsideUserId,
            flipside_type: PgRoomTypeEnum.ONE_TO_ONE,
            room_id,
            member_id: initiator.member_id,
            flipside_user_id: flipsideUserId,
          },
          {
            user_id: flipsideUserId,
            flipside_id: initiatorUserId,
            flipside_type: PgRoomTypeEnum.ONE_TO_ONE,
            room_id,
            member_id: flipsideMember.member_id,
            flipside_user_id: initiatorUserId,
          },
        ]);
      });

      return { room_id };
    } else {
      return { room_id: oldFlipside.room_id };
    }
  }
}
