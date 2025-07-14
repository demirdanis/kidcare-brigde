CREATE TABLE "public"."schools" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "address" text NOT NULL, "phone" text NOT NULL, "email" text NOT NULL, "website" text, "description" text, "is_active" boolean NOT NULL DEFAULT true, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("email"), UNIQUE ("phone"));COMMENT ON TABLE "public"."schools" IS E'schools';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_schools_updated_at"
BEFORE UPDATE ON "public"."schools"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_schools_updated_at" ON "public"."schools"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
