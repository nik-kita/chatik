import { Injectable } from '@nestjs/common';
import { MemberPgRepo, MessagePgRepo } from '../../../../../libs/pg-db/src';

@Injectable()
export class OneToOneService {
  constructor(
    private messageRepo: MessagePgRepo,
    private memberRepo: MemberPgRepo,
  ) {}
}
