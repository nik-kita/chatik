import { PgRoomTypeEnum } from '../enums/pg-room-type.enum';
import { IPgMember } from './pg-member.interface';
import { IPgRoom } from './pg-room.interface';
import { IPgUser } from './pg-user.interface';

export interface IPgMemberFlipside extends
  Pick<IPgUser, 'user_id'>,
  Pick<IPgMember, 'member_id'>,
  Pick<IPgRoom, 'room_id'> {
  member_flipside_id: string;
  flipside_id: string;
  flipside_type: PgRoomTypeEnum;
  flipside_user_id: string | null;
  /**
   * // TODO when groups will be ready
   * add:
   * flipside_group_id: string | null;
   * flipside_workspace_id: string | null;
   * etc.
   */
}
