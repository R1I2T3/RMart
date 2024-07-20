import { Scrypt } from "lucia";
import { Google } from "arctic";
import { env } from "@/env";
export const scrypt = new Scrypt();

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL
);
