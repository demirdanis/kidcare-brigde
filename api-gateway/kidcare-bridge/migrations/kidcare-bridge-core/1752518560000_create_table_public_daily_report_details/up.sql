-- Migration: 1752520400000_create_table_public_daily_report_details/up.sql
CREATE TABLE "public"."daily_report_details" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "daily_report_id" uuid NOT NULL,
    "report_item_id" uuid NOT NULL,
    "selected_value" text,
    "notes" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("daily_report_id") REFERENCES "public"."daily_reports"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("report_item_id") REFERENCES "public"."daily_report_items"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."daily_report_details" IS E'daily_report_details';

CREATE TRIGGER "set_public_daily_report_details_updated_at"
BEFORE UPDATE ON "public"."daily_report_details"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_daily_report_details_updated_at" ON "public"."daily_report_details"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;