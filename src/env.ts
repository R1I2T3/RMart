import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    EMAIL_USERNAME: z.string().min(1),
    EMAIL_PASSWORD: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_REDIRECT_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    NEXT_PUBLIC_GOOGLE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
  },
});
