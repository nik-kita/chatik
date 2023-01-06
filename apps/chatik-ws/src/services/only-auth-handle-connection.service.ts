import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OnlyAuthHandleConnectionService {
  constructor(
    private jwt: JwtService,
  ) { }

  async verifyUserFromBearer(extraArg: {
    rawHeaders?: string[],
  }) {
    const headers = extraArg
      .rawHeaders
      ?.reduce((acc, h, i, arr) => {
        if ((i + 1) % 2 === 0) acc[arr[i - 1]] = h;

        return acc;
      }, {} as { Authorization?: string });

    if (headers && headers.Authorization) {
      const payload = await this.jwt.verify(String(headers.Authorization.split('Bearer ').at(1)));

      return payload as { user_id: string }; // TODO
    }

    return null;
  }
}
