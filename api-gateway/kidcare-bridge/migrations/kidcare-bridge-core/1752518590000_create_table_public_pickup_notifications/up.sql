-- Migration: 1752520700000_create_table_public_pickup_notifications/up.sql
CREATE TABLE "public"."pickup_notifications" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "student_id" uuid NOT NULL,
    "created_by" uuid NOT NULL,
    "action_type" text NOT NULL,
    "scheduled_time" timestamptz NOT NULL,
    "estimated_minutes" integer,
    "status" text NOT NULL DEFAULT 'pending',
    "notes" text,
    "completed_at" timestamptz,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."pickup_notifications" IS E'pickup_notifications';

CREATE TRIGGER "set_public_pickup_notifications_updated_at"
BEFORE UPDATE ON "public"."pickup_notifications"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_pickup_notifications_updated_at" ON "public"."pickup_notifications"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;