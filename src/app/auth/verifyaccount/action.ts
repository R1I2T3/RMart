"use server";
import { actionClient } from "@/lib/safe-action";
import { VerifyAccountUseCase } from "./use-case";
import { z } from "zod";
import {
  CheckUserIfPresentThenReturnOtp,
  DeleteVerificationCodeAndVerifyUser,
} from "@/data-access/user.persistance";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
const VerifyAccountActionSchema = z.object({
  username: z.string(),
  pin: z.string().min(6),
});
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