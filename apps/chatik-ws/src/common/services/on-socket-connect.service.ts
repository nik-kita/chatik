import { Injectable } from '@nestjs/common';
import { MemberPgRepo, RoomPgRepo } from '../../../../../libs/pg-db/src';

@Injectable()
export class OnSocketConnectService {
  constructor(
    private memberRepo: MemberPgRepo,
    private roomRepo: RoomPgRepo,
  ) {}
}
