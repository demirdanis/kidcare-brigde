-- Migration: 1752519200000_create_table_public_students/up.sql
CREATE TABLE "public"."students" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "birth_date" date NOT NULL,
    "gender" text,
    "blood_type" text,
    "allergies" text,
    "medical_notes" text,
    "photo_url" text,
    "class_id" uuid NOT NULL,
    "school_id" uuid NOT NULL,
    "is_active" boolean NOT NULL DEFAULT true,
    "enrollment_date" timestamptz NOT NULL DEFAULT now(),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."students" IS E'students';

CREATE TRIGGER "set_public_students_updated_at"
BEFORE UPDATE ON "public"."students"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_students_updated_at" ON "public"."students"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;