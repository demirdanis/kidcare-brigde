-- Migration: 1752521300000_create_table_public_payment_plans/up.sql
CREATE TABLE "public"."payment_plans" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "school_id" uuid NOT NULL,
    "plan_name" text NOT NULL,
    "monthly_fee" decimal(10,2) NOT NULL,
    "annual_fee" decimal(10,2),
    "included_services" jsonb,
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."payment_plans" IS E'payment_plans';

CREATE TRIGGER "set_public_payment_plans_updated_at"
BEFORE UPDATE ON "public"."payment_plans"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_payment_plans_updated_at" ON "public"."payment_plans"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;