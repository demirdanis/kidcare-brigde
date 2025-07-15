-- Migration: 1752519800000_create_table_public_weekly_schedule/up.sql
CREATE TABLE "public"."weekly_schedule" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "week_start_date" date NOT NULL,
    "day_of_week" integer NOT NULL,
    "start_time" time NOT NULL,
    "end_time" time NOT NULL,
    "subject_id" uuid NOT NULL,
    "class_id" uuid NOT NULL,
    "teacher_id" uuid NOT NULL,
    "notes" text,
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."weekly_schedule" IS E'weekly_schedule';

CREATE TRIGGER "set_public_weekly_schedule_updated_at"
BEFORE UPDATE ON "public"."weekly_schedule"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_weekly_schedule_updated_at" ON "public"."weekly_schedule"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;