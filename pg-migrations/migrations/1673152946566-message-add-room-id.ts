import { MigrationInterface, QueryRunner } from 'typeorm';

export class messageAddRoomId1673152946566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table "message"
            add column "room_id" uuid not null
            constraint fk_room_room_id references "room" ("room_id");
        `);
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table "message"
            drop column "room_id";        
        `);
    }

}
