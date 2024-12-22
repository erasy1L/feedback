import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpvoteSchema1734800485138 implements MigrationInterface {
  name = 'UpvoteSchema1734800485138';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."upvotes_state_enum" AS ENUM('UP', 'DOWN', 'NONE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "upvotes" ("user_id" character varying NOT NULL, "post_id" character varying NOT NULL, "state" "public"."upvotes_state_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_06ebd55af4fd88bc7206776228b" PRIMARY KEY ("user_id", "post_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "upvotes" ADD CONSTRAINT "FK_8bf420c798307dc18c619100923" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "upvotes" ADD CONSTRAINT "FK_77c29136dc6ba7598b89b19409d" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "upvotes" DROP CONSTRAINT "FK_77c29136dc6ba7598b89b19409d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "upvotes" DROP CONSTRAINT "FK_8bf420c798307dc18c619100923"`,
    );
    await queryRunner.query(`DROP TABLE "upvotes"`);
    await queryRunner.query(`DROP TYPE "public"."upvotes_state_enum"`);
  }
}
