"use server";
import {
  ForgotPasswordInputSchema,
  VerifyAccountActionSchema,
  NewPasswordSchema,
} from "@/lib/zod/auth";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import {
  ForgotPasswordEmailInputUseCase,
  NewPasswordInputUseCase,
} from "./use-case";
import {
  CheckIfUserIsPresent,
  CheckUserIfPresentThenReturnOtp,
  DeleteVerificationCodeAndVerifyUser,
  getUserById,
  UpdatePassword,
} from "@/data-access/user.persistance";
import { SendVerificationCode } from "@/lib/mails/sendVerificationToken";
import { VerifyAccountUseCase } from "../verifyaccount/use-case";
import { env } from "@/env";
import { cookies } from "next/headers";
export const ForgotPasswordEmailInputAction = actionClient
  .schema(ForgotPasswordInputSchema)
  .action(async ({ parsedInput }) => {
    const { username, error } = await ForgotPasswordEmailInputUseCase({
      data: parsedInput,
      context: { CheckIfUserIsPresent, SendVerificationCode },
    });
    if (error) {
      return { error };
    }
    return redirect(`/auth/forgot_password/verify_otp?username=${username}`);
  });

export const ForgotPasswordVerifyEmailAction = actionClient
  .schema(VerifyAccountActionSchema)
  .action(async ({ parsedInput }) => {
    const { error, userId } = await VerifyAccountUseCase({
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
    cookies().set("forgot_password_cookie", JSON.stringify({ id: userId }), {
      secure: env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10, // 10 min
    });
    return redirect("/auth/forgot_password/new_password");
  });

export const NewPasswordAction = actionClient
  .schema(NewPasswordSchema)
  .action(async ({ parsedInput }) => {
    const forgot_password_cookie = cookies().get("forgot_password_cookie");
    if (parsedInput.new_password !== parsedInput.confirm_password) {
      return { error: "Both password does not match" };
    }
    if (!forgot_password_cookie) {
      return { error: "You are not authorized for this task" };
    }
    const cookieDetails = JSON.parse(forgot_password_cookie.value);
    if (!cookieDetails.id) {
      return { error: "Invalid cookie" };
    }
    const { error, success } = await NewPasswordInputUseCase({
      data: { password: parsedInput.new_password, id: cookieDetails.id },
      context: { getUserById, UpdatePassword },
    });
    if (error) {
      return { error };
    }
    return redirect("/auth/login");
  });
