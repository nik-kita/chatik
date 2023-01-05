import { ConfigModuleOptions } from '@nestjs/config';
import { configValidate } from './config-validate';

export function genConfigOptions(Expected: new () => any): ConfigModuleOptions {
  return {
    isGlobal: true,
    validate: configValidate(Expected),
  };
}
