-- Migration: 1752520300000_create_table_public_daily_report_item_types/up.sql
CREATE TABLE "public"."daily_report_item_types" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "report_item_id" uuid NOT NULL,
    "type_name" text NOT NULL,
    "type_value" text NOT NULL,
    "sort_order" integer NOT NULL DEFAULT 0,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("report_item_id") REFERENCES "public"."daily_report_items"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."daily_report_item_types" IS E'daily_report_item_types';

CREATE TRIGGER "set_public_daily_report_item_types_updated_at"
BEFORE UPDATE ON "public"."daily_report_item_types"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_daily_report_item_types_updated_at" ON "public"."daily_report_item_types"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;