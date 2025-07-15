-- Migration: 1752519500000_create_table_public_meal_calendar/up.sql
CREATE TABLE "public"."meal_calendar" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "meal_date" date NOT NULL,
    "meal_type" text NOT NULL,
    "description" text,
    "class_id" uuid NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."meal_calendar" IS E'meal_calendar';

CREATE TRIGGER "set_public_meal_calendar_updated_at"
BEFORE UPDATE ON "public"."meal_calendar"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_meal_calendar_updated_at" ON "public"."meal_calendar"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;