import { MigrationInterface, QueryRunner } from "typeorm"

export class roomEnum1673151458039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create type room_type as enum(
                'one_to_one', 'group'                
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop type room_type;
        `);
    }

}
