-- Migration: 1752520900000_create_table_public_conversation_participants/up.sql
CREATE TABLE "public"."conversation_participants" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "conversation_id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "joined_at" timestamptz NOT NULL DEFAULT now(),
    "last_read_at" timestamptz,
    "is_active" boolean NOT NULL DEFAULT true,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."conversation_participants" IS E'conversation_participants';

CREATE EXTENSION IF NOT EXISTS pgcrypto;