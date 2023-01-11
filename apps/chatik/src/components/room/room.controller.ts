import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateOneToOneRoomReqDto } from '../../../../../libs/dto/src/http';
import { MemberPgRepo, RoomPgRepo } from '../../../../../libs/pg-db/src';
import { JwtAccessAuthGuard } from '../../common/strategies/jwt-access/jwt-access-auth.guard';
import { PgRoomTypeEnum } from '../../../../../libs/types/src/pg';


@UseGuards(JwtAccessAuthGuard)
@Controller('room')
export class RoomController {
  constructor(
    private roomRepo: RoomPgRepo,
    private memberRepo: MemberPgRepo,
  ) { }

  @Post('one-to-one')
  async createOneToOneRoom(
    @Body() { initiatorUserId, flipsideUserId }: CreateOneToOneRoomReqDto,
  ): Promise<{
    room_id: string,
  }> {
    const room = await this.memberRepo.getOne({
      user_id: initiatorUserId,
      flipside_id: flipsideUserId,
    });

    if (room) {
      return {
        room_id: room.room_id,
      };
    } else {
      const response = await this.roomRepo.insert({ type: PgRoomTypeEnum.ONE_TO_ONE });

      // TODO are you sure that we may not wait until member insertions? (/await/ instead /void/)
      void this.memberRepo.insertMany([{
        user_id: initiatorUserId,
        flipside_id: flipsideUserId,
        flipside_type: PgRoomTypeEnum.ONE_TO_ONE,
        flipside_user_id: flipsideUserId,
        room_id: response.room_id,
      }]);

      return response;
    }
  }
}
