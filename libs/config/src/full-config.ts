import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsString, Max, Min } from 'class-validator';

const NodeEnvs = ['prod', 'dev', 'test'] as const;
type NodeEnv = typeof NodeEnvs[number];

export class FullConfig {
  @IsIn(NodeEnvs)
  NODE_ENV: NodeEnv = 'dev';

  @IsString()
  PG_HOST = 'localhost';

  @Transform(({ value }) => +value)
  @IsInt()
  PG_PORT = 5432;

  @IsString()
  PG_USER = 'postgres';

  @IsString()
  PG_PASSWORD = 'postgres';

  @IsString()
  PG_DB_NAME = `chatik_${this.NODE_ENV}`

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(3000)
  @Max(9999)
  CHATIK_PORT = 3333;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(3000)
  @Max(9999)
  AUTH_PORT = 3000;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(3000)
  @Max(9999)
  WS_PORT = 4444;

  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsString()
  JWT_REFRESH_SECRET: string;
}
