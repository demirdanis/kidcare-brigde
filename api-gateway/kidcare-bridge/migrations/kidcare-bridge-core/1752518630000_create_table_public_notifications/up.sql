-- Migration: 1752521100000_create_table_public_notifications/up.sql
CREATE TABLE "public"."notifications" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "notification_type" text NOT NULL,
    "title" text NOT NULL,
    "message" text NOT NULL,
    "data" jsonb,
    "is_read" boolean NOT NULL DEFAULT false,
    "scheduled_for" timestamptz,
    "sent_at" timestamptz,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."notifications" IS E'notifications';

CREATE TRIGGER "set_public_notifications_updated_at"
BEFORE UPDATE ON "public"."notifications"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_notifications_updated_at" ON "public"."notifications"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;