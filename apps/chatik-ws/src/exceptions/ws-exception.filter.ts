import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { WebSocket } from 'ws';


// TODO use this filter in code
@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    console.log('hi');

    const ctx = host.switchToWs();
    const client = ctx.getClient<WebSocket>();
    const data = ctx.getData();

    const error = exception.getError();

    console.log(error);

    client.send(JSON.stringify({
      name: exception.name,
      message: exception.message,
      error: error.toString(),
      data,
    }));
  }
}
