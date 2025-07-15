-- Migration: 1752519900000_create_table_public_media/up.sql
CREATE TABLE "public"."media" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "file_name" text NOT NULL,
    "file_url" text NOT NULL,
    "file_type" text NOT NULL,
    "mime_type" text NOT NULL,
    "file_size" integer NOT NULL,
    "uploaded_by" uuid NOT NULL,
    "school_id" uuid NOT NULL,
    "class_id" uuid,
    "student_id" uuid,
    "visibility_type" text NOT NULL DEFAULT 'private',
    "metadata" jsonb,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."media" IS E'media';

CREATE TRIGGER "set_public_media_updated_at"
BEFORE UPDATE ON "public"."media"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_media_updated_at" ON "public"."media"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;