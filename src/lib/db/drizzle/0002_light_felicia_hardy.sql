ALTER TABLE "verification_codes" ALTER COLUMN "expires_at" SET DEFAULT '2024-08-18 16:26:57.287';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "productImage" text NOT NULL;