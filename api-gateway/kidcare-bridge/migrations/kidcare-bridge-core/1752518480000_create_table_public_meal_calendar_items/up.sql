-- Migration: 1752519700000_create_table_public_subjects/up.sql
CREATE TABLE "public"."subjects" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text,
    "color_code" text,
    "school_id" uuid NOT NULL,
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."subjects" IS E'subjects';

CREATE TRIGGER "set_public_subjects_updated_at"
BEFORE UPDATE ON "public"."subjects"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_subjects_updated_at" ON "public"."subjects"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;