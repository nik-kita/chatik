import { MigrationInterface, QueryRunner } from 'typeorm';

export class userTable1672889201234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            create table if not exists "user" (
                user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table if exists "user";
        `);
    }

}
