import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659928712141 implements MigrationInterface {
    name = 'default1659928712141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" ADD "title" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "title"`);
    }

}
