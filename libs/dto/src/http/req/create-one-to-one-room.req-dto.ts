import { IsUUID } from 'class-validator';

export class CreateOneToOneRoomReqDto {
  @IsUUID()
  initiatorUserId: string;

  @IsUUID()
  flipsideUserId: string;
}
