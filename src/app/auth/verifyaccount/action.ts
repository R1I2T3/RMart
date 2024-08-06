"use server";
import { actionClient } from "@/lib/safe-action";
import { VerifyAccountUseCase } from "./use-case";
import {
  CheckUserIfPresentThenReturnOtp,
  DeleteVerificationCodeAndVerifyUser,
} from "@/data-access/user.persistance";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { VerifyAccountActionSchema } from "@/lib/zod/auth";
export const verifyAccountAction = actionClient
  .schema(VerifyAccountActionSchema)
  .action(async ({ parsedInput }) => {
    const { error, success, userId } = await VerifyAccountUseCase({
      data: {
        pin: parsedInput.pin,
        username: parsedInput.username,
      },
      context: {
        CheckUserIfPresentThenReturnOtp,
        DeleteVerificationCodeAndVerifyUser,
      },
    });
    if (error) {
      return { error: error };
    }
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/");
  });
