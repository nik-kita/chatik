import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { UnAuthConnectionWsException } from './unauth-connection.ws-exception';


type WsExceptionRes = {
  event: 'Error',
  data: {
    name?: string,
    message?: string,
  }
};

@Catch(WsException)
@Injectable()
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<WebSocket>();
    const res: WsExceptionRes = {
      event: 'Error',
      data: {
        name: exception?.name,
        message: exception?.message,
      }
    };
    const strRes = JSON.stringify(res);
    console.log(exception);

    if (exception instanceof UnAuthConnectionWsException) {
      console.log('hi');
      client.close(HttpStatus.UNAUTHORIZED + 4_000, strRes);

      return;
    }

    client.send(strRes);
  }
}
