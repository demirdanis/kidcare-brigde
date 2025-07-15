-- Migration: 1752520500000_create_table_public_medications/up.sql
CREATE TABLE "public"."medications" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "student_id" uuid NOT NULL,
    "medication_name" text NOT NULL,
    "dosage" text NOT NULL,
    "frequency" text NOT NULL,
    "start_date" date NOT NULL,
    "end_date" date,
    "instructions" text,
    "prescribed_by" uuid,
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("prescribed_by") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."medications" IS E'medications';

CREATE TRIGGER "set_public_medications_updated_at"
BEFORE UPDATE ON "public"."medications"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_medications_updated_at" ON "public"."medications"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;