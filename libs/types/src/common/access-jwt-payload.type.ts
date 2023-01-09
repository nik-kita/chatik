import { IPgUser } from '../pg/entity-interfaces/pg-user.interface';

export type JwtAccessPayload = Pick<IPgUser, 'user_id'> & {
  iat: number, // TODO complete and concrete jwt payload type
};
