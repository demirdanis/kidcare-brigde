-- Migration: 1752520100000_create_table_public_daily_reports/up.sql
CREATE TABLE "public"."daily_reports" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "student_id" uuid NOT NULL,
    "report_date" date NOT NULL,
    "teacher_id" uuid NOT NULL,
    "arrival_time" time,
    "departure_time" time,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."daily_reports" IS E'daily_reports';

CREATE TRIGGER "set_public_daily_reports_updated_at"
BEFORE UPDATE ON "public"."daily_reports"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_daily_reports_updated_at" ON "public"."daily_reports"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;