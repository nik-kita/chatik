/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { Client } from 'pg';

config({ path: join(__dirname, '.test.env') });


export default async () => {
    const client = new Client({
        host: process.env.TEST_PG_HOST,
        user: process.env.TEST_PG_USER,
        port: +process.env.TEST_PG_PORT!,
        password: process.env.TEST_PG_PASSWORD,
    });

    /**
    * PLEASE, DON'T DROP PRODUCTION ! ! ! :D
    */
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS "${process.env.TEST_PG_DB_NAME}" WITH (FORCE)`);
    await client.query(`CREATE DATABASE "${process.env.TEST_PG_DB_NAME}"`);
    await client.end();

    const dSource = await new DataSource({
        port: +process.env.TEST_PG_PORT!,
        type: 'postgres',
        database: process.env.TEST_PG_DB_NAME,
        host: process.env.TEST_PG_HOST,
        username: process.env.TEST_PG_USER,
        password: process.env.TEST_PG_PASSWORD,
        migrations: [join(process.cwd(), 'pg-migrations', 'migrations/*')],
        logging: true,
    }).initialize();


    await dSource.undoLastMigration({ transaction: 'all' });
    await dSource.runMigrations({ transaction: 'all' });
    await dSource.destroy();
};
