import { PickType } from '@nestjs/mapped-types';
import { RegisterReqDto } from './register.req-dto';


export class LoginReqDto extends PickType(RegisterReqDto, [
  'email',
  'password',
]) {}
