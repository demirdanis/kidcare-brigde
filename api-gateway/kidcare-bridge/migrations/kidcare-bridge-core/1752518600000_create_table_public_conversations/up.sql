-- Migration: 1752520800000_create_table_public_conversations/up.sql
CREATE TABLE "public"."conversations" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "conversation_type" text NOT NULL,
    "school_id" uuid NOT NULL,
    "class_id" uuid,
    "is_active" boolean NOT NULL DEFAULT true,
    "last_message_at" timestamptz,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."conversations" IS E'conversations';

CREATE TRIGGER "set_public_conversations_updated_at"
BEFORE UPDATE ON "public"."conversations"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_conversations_updated_at" ON "public"."conversations"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;