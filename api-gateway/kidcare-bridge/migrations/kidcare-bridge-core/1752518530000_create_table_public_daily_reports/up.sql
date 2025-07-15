-- Migration: 1752520200000_create_table_public_daily_report_items/up.sql
CREATE TABLE "public"."daily_report_items" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "school_id" uuid NOT NULL,
    "title" text NOT NULL,
    "sort_order" integer NOT NULL DEFAULT 0,
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."daily_report_items" IS E'daily_report_items';

CREATE TRIGGER "set_public_daily_report_items_updated_at"
BEFORE UPDATE ON "public"."daily_report_items"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_daily_report_items_updated_at" ON "public"."daily_report_items"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;