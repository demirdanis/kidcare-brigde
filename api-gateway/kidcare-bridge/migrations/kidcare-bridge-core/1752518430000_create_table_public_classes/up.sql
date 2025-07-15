-- 1752518714962_create_table_public_classes/up.sql (UPDATED)
CREATE TABLE "public"."classes" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "description" text NOT NULL,
    "age_group_min" integer NOT NULL,
    "age_group_max" integer NOT NULL,
    "capacity" integer NOT NULL,
    "school_id" uuid NOT NULL,
    "main_teacher_id" uuid, -- NULL'a izin ver
    "secondary_teacher_id" uuid, -- NULL'a izin ver
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("main_teacher_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("secondary_teacher_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."classes" IS E'classes';

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_public_classes_updated_at"
BEFORE UPDATE ON "public"."classes"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_classes_updated_at" ON "public"."classes"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;