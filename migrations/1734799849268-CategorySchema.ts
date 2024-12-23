import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategorySchema1734799849268 implements MigrationInterface {
  name = 'CategorySchema1734799849268';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "category" (value) VALUES ('feature'), ('ui'), ('bug')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
