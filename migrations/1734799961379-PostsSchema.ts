import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostsSchema1734799961379 implements MigrationInterface {
  name = 'PostsSchema1734799961379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "category_id" integer NOT NULL, "status_id" integer NOT NULL, "author_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category" integer, "status" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2d82eb2bb2ddd7a6bfac8804d8" ON "posts" ("title") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_60818528127866f5002e7f826d" ON "posts" ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_444e26d62299533ae086d0b854" ON "posts" ("category", "status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a69d9e2ae78ef7d100f8317ae0" ON "posts" ("status") `,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_c81be77ac4b528ea4f2c94fcfbe" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_a69d9e2ae78ef7d100f8317ae0f" FOREIGN KEY ("status") REFERENCES "status"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_a69d9e2ae78ef7d100f8317ae0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_c81be77ac4b528ea4f2c94fcfbe"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a69d9e2ae78ef7d100f8317ae0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_444e26d62299533ae086d0b854"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60818528127866f5002e7f826d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2d82eb2bb2ddd7a6bfac8804d8"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
