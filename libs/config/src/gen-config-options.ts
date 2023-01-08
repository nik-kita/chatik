import { ConfigModuleOptions } from '@nestjs/config';
import { configValidate } from './config-validate';
import { config } from 'dotenv';
import { NodeEnv } from './full-config';
import { join } from 'path';


config();

const cwd = process.cwd();


config({ path: join(cwd, '.default.env') });

const envFilePath = ({
  prod: join(cwd, '.prod.env'),
  dev: join(cwd, '.dev.env'),
  test: join(cwd, '.test.env'),
} satisfies Record<NodeEnv, string>)[process.env.NODE_ENV || 'test'];

export function genConfigOptions(Expected: new () => any): ConfigModuleOptions {
  return {
    isGlobal: true,
    validate: configValidate(Expected),
    envFilePath,
  };
}
