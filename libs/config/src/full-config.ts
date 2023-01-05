import { Transform } from 'class-transformer';
import { IsIn, IsInt, Max, Min } from 'class-validator';

const NodeEnvs = ['prod', 'dev', 'test'] as const;
type NodeEnv = typeof NodeEnvs[number];

export class FullConfig {
  @IsIn(NodeEnvs)
  NODE_ENV: NodeEnv = 'dev';

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(3000)
  @Max(9999)
  CHATIK_PORT = 3333;
}
