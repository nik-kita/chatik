import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMessageUserId1673138029939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table "message"
            add column "user_id" uuid not null
            constraint fk_user_user_id references "user" ("user_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table "message"
            drop column "user_id";
        `);
    }

}
