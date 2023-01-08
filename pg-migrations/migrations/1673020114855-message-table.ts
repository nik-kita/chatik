import { MigrationInterface, QueryRunner } from "typeorm";

export class messageTable1673020114855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "message" (
                message_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

                text varchar not null
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop table if exists "message";
        `);
    }
}
