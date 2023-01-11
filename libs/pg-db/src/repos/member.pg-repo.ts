import { Repository } from 'typeorm';
import { MemberEntity } from '../entities/member.entity';
import { PgRepo } from './base.pg-repo';
import { InjectRepository } from '@nestjs/typeorm';

export class MemberPgRepo extends
  PgRepo<MemberEntity,
    'member_id',
    {
      room_id,
      user_id,
      flipside_id,
      flipside_type,
    } & ({ flipside_user_id })
  > {
  constructor(
    @InjectRepository(MemberEntity)
    protected repo: Repository<MemberEntity>,
  ) {
    super(repo, 'member_id');
  }
}
