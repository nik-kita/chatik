import { MigrationInterface, QueryRunner } from 'typeorm';

export class memberFlipsideTable1673240297937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists "member_flipside" (
                member_flipside_id uuid primary key default uuid_generate_v4(),

                user_id uuid not null
                constraint fk_user_user_id references "user" ("user_id"),

                member_id uuid not null
                constraint fk_member_member_id references "member" ("member_id"),

                room_id uuid not null
                constraint fk_room_room_id references "room" ("room_id"),

                flipside_type room_type not null,

                flipside_id uuid not null
                constraint check_that_eq_to_one_of_flipside_fks
                check (flipside_id = flipside_user_id),

                flipside_user_id uuid
                constraint fk_flipside_user_user_id references "user" ("user_id"),

                unique (member_id, flipside_id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop table if exists "member_flipside";
        `);
    }

}
