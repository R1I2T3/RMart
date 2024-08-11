"use server";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { authActionClient } from "@/lib/safe-action";

export const LogoutAction = authActionClient.action(async ({ ctx }) => {
  await lucia.invalidateSession(ctx.sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/auth/login");
});
