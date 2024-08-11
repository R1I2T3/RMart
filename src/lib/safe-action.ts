import { createSafeActionClient } from "next-safe-action";
import { validateRequest } from "./auth/VerifyUserisAuthenticatedOrNot";
export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const { user, session } = await validateRequest();
  if (!user) {
    throw new Error("Session is not valid!");
  }
  return next({ ctx: { userId: user.id, sessionId: session.id } });
});
