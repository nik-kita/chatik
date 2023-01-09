import { InjectRepository } from '@nestjs/typeorm';
import { MemberFlipsideEntity } from '../entities';
import { PgRepo } from './base.pg-repo';
import { Repository } from 'typeorm';

export class MemberFlipsidePgRepo extends
PgRepo<
  MemberFlipsideEntity,
  'member_flipside_id',
  {
    flipside_id,
    flipside_type,
    room_id,
    user_id,
    member_id,
  } & ({ flipside_user_id } /** // TODO | { flipside_group_id } */)
> {
  constructor(
    @InjectRepository(MemberFlipsideEntity)
    protected repo: Repository<MemberFlipsideEntity>,
  ) {
    super(repo, 'member_flipside_id');
  }
}
