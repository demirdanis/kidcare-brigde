-- Migration: 1752521400000_create_table_public_school_payments/up.sql
CREATE TABLE "public"."school_payments" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "school_id" uuid NOT NULL,
    "payment_plan_id" uuid NOT NULL,
    "payment_year" integer NOT NULL,
    "payment_month" integer NOT NULL,
    "amount" decimal(10,2) NOT NULL,
    "payment_status" text NOT NULL DEFAULT 'pending',
    "due_date" timestamptz NOT NULL,
    "paid_date" timestamptz,
    "payment_method" text,
    "transaction_id" text,
    "notes" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("payment_plan_id") REFERENCES "public"."payment_plans"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."school_payments" IS E'school_payments';

CREATE TRIGGER "set_public_school_payments_updated_at"
BEFORE UPDATE ON "public"."school_payments"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_school_payments_updated_at" ON "public"."school_payments"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;