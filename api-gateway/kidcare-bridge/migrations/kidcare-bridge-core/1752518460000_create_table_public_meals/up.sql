-- Migration: 1752519300000_create_table_public_student_parents/up.sql
CREATE TABLE "public"."student_parents" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "student_id" uuid NOT NULL,
    "parent_id" uuid NOT NULL,
    "relationship" text NOT NULL,
    "is_primary_contact" boolean NOT NULL DEFAULT false,
    "can_pickup" boolean NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."student_parents" IS E'student_parents';

CREATE TRIGGER "set_public_student_parents_updated_at"
BEFORE UPDATE ON "public"."student_parents"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_student_parents_updated_at" ON "public"."student_parents"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;