ALTER TABLE "verification_codes" ALTER COLUMN "expires_at" SET DEFAULT '2024-08-04 17:35:39.314';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "email_users" DROP COLUMN IF EXISTS "is_verified";