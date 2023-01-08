import { IPgUser } from '../pg/entity-interfaces/pg-user.interface';

export type JwtAccessPayload = Pick<IPgUser, 'user_id'>;
