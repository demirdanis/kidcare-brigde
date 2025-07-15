-- Migration: 1752521500000_create_table_public_student_payments/up.sql
CREATE TABLE "public"."student_payments" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "student_id" uuid NOT NULL,
    "parent_id" uuid NOT NULL,
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
    FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."student_payments" IS E'student_payments';

CREATE TRIGGER "set_public_student_payments_updated_at"
BEFORE UPDATE ON "public"."student_payments"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_student_payments_updated_at" ON "public"."student_payments"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;