import { MigrationInterface, QueryRunner } from 'typeorm';

export class userAddEmail1672894112988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION if not exists citext;');
        await queryRunner.query(`
            alter table "user"
            add column email citext unique;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"  
            DROP COLUMN email;
        `);
        await queryRunner.query('drop EXTENSION if exists citext;');
    }
}
