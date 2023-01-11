import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateOneToOneRoomReqDto } from '../../../../../libs/dto/src/http';
import { MemberPgRepo, RoomPgRepo } from '../../../../../libs/pg-db/src';
import { JwtAccessAuthGuard } from '../../common/strategies/jwt-access/jwt-access-auth.guard';


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
    throw new Error('Not implemented yet');
  }
}
