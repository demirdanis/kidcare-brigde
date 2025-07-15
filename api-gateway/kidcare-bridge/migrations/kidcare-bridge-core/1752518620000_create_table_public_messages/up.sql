-- Migration: 1752521000000_create_table_public_messages/up.sql
CREATE TABLE "public"."messages" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "conversation_id" uuid NOT NULL,
    "sender_id" uuid NOT NULL,
    "content" text NOT NULL,
    "message_type" text NOT NULL DEFAULT 'text',
    "attachments" jsonb,
    "is_read" boolean NOT NULL DEFAULT false,
    "sent_at" timestamptz NOT NULL DEFAULT now(),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."messages" IS E'messages';

CREATE TRIGGER "set_public_messages_updated_at"
BEFORE UPDATE ON "public"."messages"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_messages_updated_at" ON "public"."messages"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;