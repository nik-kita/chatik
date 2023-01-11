import { IsUUID } from 'class-validator';

export class CreateOneToOneRoomReqDto {
  @IsUUID()
  flipsideUserId: string;
}
