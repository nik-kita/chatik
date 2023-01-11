import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateOneToOneRoomReqDto } from '../../../../../libs/dto/src/http';
import { MemberPgRepo, RoomPgRepo } from '../../../../../libs/pg-db/src';
import { JwtAccessAuthGuard } from '../../common/strategies/jwt-access/jwt-access-auth.guard';
import { PgRoomTypeEnum } from '../../../../../libs/types/src/pg';
import { JwtAccessPayload } from '../../../../../libs/types/src';


@UseGuards(JwtAccessAuthGuard)
@Controller('room')
export class RoomController {
  constructor(
    private roomRepo: RoomPgRepo,
    private memberRepo: MemberPgRepo,
  ) { }

  @Post('one-to-one')
  async createOneToOneRoom(
    @Body() { flipsideUserId }: CreateOneToOneRoomReqDto,
    @Request() { user_id }: JwtAccessPayload,
  ): Promise<{
    room_id: string,
  }> {
      // TODO add to HttpExceptionFilter /duplicate pg error/ case
      const response = await this.roomRepo.insert({ type: PgRoomTypeEnum.ONE_TO_ONE });

      void this.memberRepo.insertMany([{
        user_id,
        flipside_id: flipsideUserId,
        flipside_type: PgRoomTypeEnum.ONE_TO_ONE,
        flipside_user_id: flipsideUserId,
        room_id: response.room_id,
      }]);

      return response;
  }

  @Get()
  async getOneToOneChatsWithMe(
    @Request() { user_id }: JwtAccessPayload,
  ) {
    return this.memberRepo.get({ user_id, flipside_type: PgRoomTypeEnum.ONE_TO_ONE });
  }
}
