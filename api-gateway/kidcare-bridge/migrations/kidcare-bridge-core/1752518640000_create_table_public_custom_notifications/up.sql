-- Migration: 1752521200000_create_table_public_custom_notifications/up.sql
CREATE TABLE "public"."custom_notifications" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "student_id" uuid NOT NULL,
    "created_by" uuid NOT NULL,
    "notification_type" text NOT NULL,
    "title" text NOT NULL,
    "message" text NOT NULL,
    "scheduled_for" timestamptz,
    "status" text NOT NULL DEFAULT 'pending',
    "metadata" jsonb,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."custom_notifications" IS E'custom_notifications';

CREATE TRIGGER "set_public_custom_notifications_updated_at"
BEFORE UPDATE ON "public"."custom_notifications"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_custom_notifications_updated_at" ON "public"."custom_notifications"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;