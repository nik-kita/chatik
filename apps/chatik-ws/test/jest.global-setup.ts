import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

config({ path: join(__dirname, '.test.env') });

export default async () => {
    const dSource = new DataSource({
        type: 'postgres',
        host: process.env.TEST_PG_HOST,
        username: process.env.TEST_PG_USER,
        password: process.env.TEST_PG_PASSWORD,
        migrations: [join(process.cwd()), 'pg-migrations', 'migrations/*'],
        migrationsRun: true,
    });

    await dSource.runMigrations();
    await dSource.initialize();
    /**
     * PLEASE, DON'T DROP PRODUCTION ! ! ! :D
     */
    await dSource.query(`DROP DATABASE IF EXISTS "${process.env.TEST_PG_DB_NAME}" WITH (FORCE)`);
    await dSource.query(`CREATE DATABASE "${process.env.TEST_PG_DB_NAME}"`);
    await dSource.destroy();
};
