import { MigrationInterface, QueryRunner } from 'typeorm';

export class uuidSspExtension1672889201233 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP EXTENSION IF EXISTS "uuid-ossp";
        `);
    }

}
