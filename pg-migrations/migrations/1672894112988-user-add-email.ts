import { MigrationInterface, QueryRunner } from "typeorm"

export class userAddEmailPassword1672893821012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

}
