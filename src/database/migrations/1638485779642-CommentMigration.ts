import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentMigration1638485779642 implements MigrationInterface {
    name = 'CommentMigration1638485779642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "organization" character varying NOT NULL, "comment" character varying NOT NULL, "deleted_date" TIMESTAMP, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
