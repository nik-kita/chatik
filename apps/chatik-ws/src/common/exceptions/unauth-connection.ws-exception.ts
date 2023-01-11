import { WsException } from '@nestjs/websockets';

export class UnAuthConnectionWsException extends WsException {
  public name = 'Unauthorized connection';

  constructor(errorOrReason: Error | 'User was not found') {
    super(errorOrReason);
  }
}
