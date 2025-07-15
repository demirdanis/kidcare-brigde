-- Migration: 1752519600000_create_table_public_meal_calendar_items/up.sql
CREATE TABLE "public"."meal_calendar_items" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "meal_calendar_id" uuid NOT NULL,
    "meal_id" uuid NOT NULL,
    "sort_order" integer NOT NULL DEFAULT 0,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("meal_calendar_id") REFERENCES "public"."meal_calendar"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("meal_id") REFERENCES "public"."meals"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."meal_calendar_items" IS E'meal_calendar_items';

CREATE TRIGGER "set_public_meal_calendar_items_updated_at"
BEFORE UPDATE ON "public"."meal_calendar_items"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_meal_calendar_items_updated_at" ON "public"."meal_calendar_items"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;