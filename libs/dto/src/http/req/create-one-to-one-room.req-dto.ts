import { IsUUID } from 'class-validator';

export class CreateOneToOneRoomReqDto {
  @IsUUID()
  firstUserId: string;

  @IsUUID()
  secondUserId: string;
}
