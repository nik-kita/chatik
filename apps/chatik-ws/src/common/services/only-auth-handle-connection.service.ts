import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPgRepo } from '../../../../../libs/pg-db/src';
import { UnAuthConnectionWsException } from '../exceptions/unauth-connection.ws-exception';
import { JwtAccessPayload } from '../../../../../libs/types/src';

@Injectable()
export class OnlyAuthHandleConnectionService {
  constructor(
    private jwt: JwtService,
    private userRepo: UserPgRepo,
  ) { }

  async verifyUserFromBearer(arg: {
    rawHeaders?: string[],
  } | unknown) {
    try {
      const { Authorization } = this.extractAuthorizationHeader(arg);
      const token = this.extractJwtFromBearer(Authorization);
      const _payload = await this.jwt.verify(token) as JwtAccessPayload;
      const payload = { user_id: _payload.user_id };
      const user = await this.userRepo.getByPK(payload);

      if (!user) {
        throw new Error('User was not found');
      }

      return payload;
    } catch (error) {
      throw new UnAuthConnectionWsException(error);
    }
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
