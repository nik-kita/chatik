import { Body, Controller, Post } from '@nestjs/common';
import { RoomPgRepo } from '../../../../../libs/pg-db/src';
import { CreateOneToOneRoomReqDto } from '../../../../../libs/dto/src/http';

@Controller('room')
export class RoomController {
  constructor(
    private roomRepo: RoomPgRepo,
  ) {}

  @Post('one-to-one')
  async createOneToOneRoom(
    @Body() body: CreateOneToOneRoomReqDto,
  ) {
    
  }
}
