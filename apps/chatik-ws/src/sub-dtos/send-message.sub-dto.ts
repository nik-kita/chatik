import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageSubDto {
  @Transform(({ value }) => {
    return typeof value === 'string' ? value.trim() : value;
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
