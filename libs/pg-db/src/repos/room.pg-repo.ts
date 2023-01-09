import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../entities/room.entity';
import { PgRepo } from './base.pg-repo';
import { Repository } from 'typeorm';

export class RoomPgRepo extends PgRepo<RoomEntity, 'room_id', {
  type,
}> {
  constructor(
    @InjectRepository(RoomEntity)
    protected repo: Repository<RoomEntity>,
  ) {
    super(repo, 'room_id');
  }
}
