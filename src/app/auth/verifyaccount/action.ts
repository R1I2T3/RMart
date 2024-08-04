"use server";
import { actionClient } from "@/lib/safe-action";
import { VerifyAccountUseCase } from "./use-case";
import { z } from "zod";
import {
  CheckUserIfPresentThenReturnOtp,
  DeleteVerificationCodeAndVerifyUser,
} from "@/data-access/user.persistance";
import { redirect } from "next/navigation";
const VerifyAccountActionSchema = z.object({
  username: z.string(),
  pin: z.string().min(6),
});
export const verifyAccountAction = actionClient
  .schema(VerifyAccountActionSchema)
  .action(async ({ parsedInput }) => {
    const { error, success } = await VerifyAccountUseCase({
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
    return redirect("/");
  });
