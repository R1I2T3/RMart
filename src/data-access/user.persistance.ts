import "server-only";

import { db } from "@/lib/db";
import { emailUser, user } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { createUserArgsType } from "@/types/auth";
export const isUserPresent = async (email: string, username: string) => {
  const currentUser = (
    await db
      .select()
      .from(user)
      .where(or(eq(user.email, email), eq(user.username, username)))
  )[0];
  if (currentUser) {
    return true;
  }
  return false;
};

export const createUser = async ({
  id,
  username,
  email,
  password,
}: createUserArgsType) => {
  const newUser = (
    await db
      .insert(user)
      .values({ id: id, username: username, email: email })
      .returning({ username: user.username, userType: user.userType })
  )[0];
  await db.insert(emailUser).values({ email, password });
  return newUser;
};
