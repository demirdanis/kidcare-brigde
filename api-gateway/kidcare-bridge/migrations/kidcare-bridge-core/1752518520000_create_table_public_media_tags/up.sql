-- Migration: 1752520000000_create_table_public_media_tags/up.sql
CREATE TABLE "public"."media_tags" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "media_id" uuid NOT NULL,
    "tag_name" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."media_tags" IS E'media_tags';

CREATE EXTENSION IF NOT EXISTS pgcrypto;