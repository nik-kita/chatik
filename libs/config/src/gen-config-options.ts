import { ConfigModuleOptions } from '@nestjs/config';
import { configValidate } from './config-validate';
import { config } from 'dotenv';
import { NodeEnv } from './full-config';

config();
config({ path: '.default.env' });

const envFile = ({
  prod: '',
  dev: '.dev',
  test: '.test',
} satisfies Record<NodeEnv, string>)[process.env.NODE_ENV || 'test'];

export function genConfigOptions(Expected: new () => any): ConfigModuleOptions {
  return {
    isGlobal: true,
    validate: configValidate(Expected),
    envFilePath: `${envFile}.env`,
  };
}
