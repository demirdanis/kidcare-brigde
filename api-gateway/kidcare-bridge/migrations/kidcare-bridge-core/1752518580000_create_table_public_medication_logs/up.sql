-- Migration: 1752520600000_create_table_public_medication_logs/up.sql
CREATE TABLE "public"."medication_logs" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "medication_id" uuid NOT NULL,
    "administered_by" uuid NOT NULL,
    "administered_at" timestamptz NOT NULL,
    "dosage_given" text NOT NULL,
    "notes" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("medication_id") REFERENCES "public"."medications"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("administered_by") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."medication_logs" IS E'medication_logs';

CREATE TRIGGER "set_public_medication_logs_updated_at"
BEFORE UPDATE ON "public"."medication_logs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_medication_logs_updated_at" ON "public"."medication_logs"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;