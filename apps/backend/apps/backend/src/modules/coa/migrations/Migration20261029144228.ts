import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261029144228 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "coa_batch" ("id" text not null, "product_id" text not null, "variant_id" text null, "batch_number" text not null, "status" text check ("status" in ('current', 'archived', 'pending')) not null default 'current', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "coa_batch_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_coa_batch_product_id" ON "coa_batch" ("product_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_coa_batch_deleted_at" ON "coa_batch" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "coa_test" ("id" text not null, "purity" text not null, "lab" text not null, "test_date" text not null, "document_url" text not null, "test_type" text not null default 'HPLC', "status" text check ("status" in ('current', 'archived')) not null default 'current', "batch_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "coa_test_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_coa_test_batch_id" ON "coa_test" ("batch_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_coa_test_deleted_at" ON "coa_test" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "coa_test" add constraint "coa_test_batch_id_foreign" foreign key ("batch_id") references "coa_batch" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "coa_test" drop constraint if exists "coa_test_batch_id_foreign";`);

    this.addSql(`drop table if exists "coa_batch" cascade;`);

    this.addSql(`drop table if exists "coa_test" cascade;`);
  }

}
