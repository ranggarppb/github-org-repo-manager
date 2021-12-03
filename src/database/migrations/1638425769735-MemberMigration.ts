import { MigrationInterface, QueryRunner } from 'typeorm';

export class MemberMigration1638425769735 implements MigrationInterface {
  name = 'MemberMigration1638425769735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "member" ("login_id" integer NOT NULL, "login" character varying NOT NULL, "avatar_url" character varying NOT NULL, "cnt_followers" integer NOT NULL, "cnt_following" character varying NOT NULL, CONSTRAINT "PK_bba570829baedd293001cebd533" PRIMARY KEY ("login_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "member"`);
  }
}
