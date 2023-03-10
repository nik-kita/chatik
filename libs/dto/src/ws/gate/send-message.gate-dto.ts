import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SendMessageGateDto {
  @Transform(({ value }) => {
    return typeof value === 'string' ? value.trim() : value;
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsUUID()
  to: string;
}
