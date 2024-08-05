import "server-only";

import { db } from "@/lib/db";
import { emailUser, user, VerificationCode } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { createUserArgsType } from "@/types/auth";
export const isUserPresent = async (email: string, username: string) => {
  const currentUser = (
    await db
      .select()
      .from(user)
      .where(or(eq(user.email, email), eq(user.username, username)))
  )[0];
  return currentUser;
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

export const CheckUserIfPresentThenReturnOtp = async ({
  username,
}: {
  username: string;
}) => {
  const currentUser = (
    await db.select().from(user).where(eq(user.username, username))
  )[0];
  if (!currentUser) {
    return { error: "user with this username does not exists" };
  }

  const verificationCode = (
    await db
      .select()
      .from(VerificationCode)
      .where(eq(VerificationCode.userId, currentUser.id))
  )[0];
  if (
    !verificationCode ||
    !verificationCode.id ||
    !verificationCode.expiry ||
    !verificationCode.verificationCode
  ) {
    return { error: "Their is no otp associated with following account" };
  }
  return { verificationCode };
};

export const DeleteVerificationCodeAndVerifyUser = async ({
  id,
  username,
}: {
  id: string;
  username: string;
}) => {
  await db
    .update(user)
    .set({ isVerified: true })
    .where(eq(user.username, username));
  await db.delete(VerificationCode).where(eq(VerificationCode.id, id));
};

export const CheckIfUserIsPresent = async ({ email }: { email: string }) => {
  const currentUser = (
    await db
      .select()
      .from(user)
      .innerJoin(emailUser, eq(emailUser.email, email))
      .where(eq(user.email, email))
  )[0];
  return currentUser;
};
