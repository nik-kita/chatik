import { IPgUser } from '../pg-entities/pg-user.interface';

export type JwtAccessPayload = Pick<IPgUser, 'user_id'>;
