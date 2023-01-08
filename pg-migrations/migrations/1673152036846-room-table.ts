import { MigrationInterface, QueryRunner } from "typeorm";

export class roomTable1673152036846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "room" (
                room_id uuid primary key default uuid_generate_v4(),

                type room_type not null
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop table if exists "room";
        `);
    }

}
