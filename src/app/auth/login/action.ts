"use server";
import { LoginSchema } from "@/lib/zod/auth";
import { actionClient } from "@/lib/safe-action";
import { LoginUseCase } from "./use-case";
import { CheckIfUserIsPresent } from "@/data-access/user.persistance";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const LoginAction = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput }) => {
    const { error, id } = await LoginUseCase({
      data: parsedInput,
      context: { CheckIfUserIsPresent },
    });
    if (error) {
      return { error };
    }
    const session = await lucia.createSession(id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/");
  });
