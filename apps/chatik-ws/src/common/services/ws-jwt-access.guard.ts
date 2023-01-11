import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WebSocket } from 'ws';
import { UserPgRepo } from '../../../../../libs/pg-db/src';
import { JwtAccessPayload } from '../../../../../libs/types/src';
import { UnAuthConnectionWsException } from '../exceptions/unauth-connection.ws-exception';
import { WsExceptionFilter } from '../exceptions/ws-exception.filter';

@Injectable()
export class WsJwtAccessGuard {
  constructor(
    private jwt: JwtService,
    private userRepo: UserPgRepo,
    private wsExceptionFilter: WsExceptionFilter,
  ) { }

  async verifyUserFromBearer(client: WebSocket, arg: {
    rawHeaders?: string[],
  } | unknown) {
    try {
      const { Authorization } = this.extractAuthorizationHeader(arg);
      const token = this.extractJwtFromBearer(Authorization);
      const _payload = await this.jwt.verify(token) as JwtAccessPayload;
      const payload = { user_id: _payload.user_id };
      const user = await this.userRepo.getByPK(payload);

      if (!user) {
        throw new UnAuthConnectionWsException('User was not found');
      }

      return payload;
    } catch (error) {
      this.wsExceptionFilter.catch(error, {
        switchToWs: () => ({
          getClient: () => client,
        }),
      } as any);

      // TODO move both UnAuthConnectionWsException and InternalServerError to WsExceptionFilter
      if (!(error instanceof UnAuthConnectionWsException)) {
        client.close(HttpStatus.INTERNAL_SERVER_ERROR + 4_000, JSON.stringify({
          event: 'Error',
          data: {
            name: 'Internal server error',
            message: 'Fail to connect by unknown reason',
          },
        }));
      }
    }

    return null;
  }

  private extractAuthorizationHeader(arg: any): { Authorization: string } {
    const headers = arg?.rawHeaders?.reduce((acc, h, i, arr) => {
      if ((i + 1) % 2 === 0) acc[ arr[ i - 1 ] ] = h;

      return acc;
    }, {} as { Authorization?: string }) || {};

    if (!headers.Authorization) {
      throw new Error('/Authorization/ header is missing');
    }

    return headers;
  }

  private extractJwtFromBearer(bearerStr: string) {
    return bearerStr.split('Bearer ').at(1) || '';
  }
}
