import { MigrationInterface, QueryRunner } from 'typeorm';

export class userAddEmail1672895132387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table "user"
            add column password varchar not null;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"  
            DROP COLUMN password;
        `);
    }
}
