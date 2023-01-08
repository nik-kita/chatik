import { PickType } from '@nestjs/mapped-types';
import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { configValidate } from '../libs/config/src/config-validate';
import { FullConfig, NodeEnv } from '../libs/config/src/full-config';
import { join } from 'path';

config();
config({ path: '.default.env' });

config({ path: `.${process.env.NODE_ENV}.env`})




class DataSourceEnv extends PickType(FullConfig, [
  'NODE_ENV',
  'PG_HOST',
  'PG_PORT',
  'PG_USER',
  'PG_PASSWORD',
  'PG_DB_NAME',
]) { }

let dsEnv!: DataSourceEnv;

try {
  dsEnv = configValidate(DataSourceEnv)(process.env);
} catch (error) {
  console.error(error);
  process.exit(1);
}

const configuration = {
  type: 'postgres' as const,
  host: dsEnv.PG_HOST,
  port: dsEnv.PG_PORT,
  username: dsEnv.PG_USER,
  password: dsEnv.PG_PASSWORD,
  synchronize: false,
  migrationsRun: false,
  logging: true,
  database: dsEnv.PG_DB_NAME,
  migrations: [join(__dirname, 'migrations/*')],
};

export const AppDataSource = new DataSource(configuration);
