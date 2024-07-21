"use server";
import { signupSchema } from "@/lib/zod/auth";
import { actionClient } from "@/lib/safe-action";
import { createUser, isUserPresent } from "@/data-access/user.persistance";
import { signupUseCase } from "./use-case";
import { SendVerificationCode } from "@/lib/mails/sendVerificationToken";
import { redirect } from "next/navigation";

export const signupAction = actionClient
  .schema(signupSchema)
  .action(async ({ parsedInput }) => {
    const { username, userId } = await signupUseCase({
      context: { createUser: createUser, isUserPresent: isUserPresent },
      data: parsedInput,
    });
    await SendVerificationCode({
      id: userId!,
      email: parsedInput.email!,
      db_purpose: "verify_account",
      username: username!,
      purpose: "verification code for verifying account",
    });
    return redirect(
      `/auth/verifyaccount?username=${username?.replace(" ", "+")}`
    );
  });
