import { createSafeActionClient } from "next-safe-action";
import { validateRequest } from "./auth/VerifyUserisAuthenticatedOrNot";
import { DatabaseUserAttributes } from "./auth";
export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const { user, session } = await validateRequest();
  if (!user) {
    throw new Error("Session is not valid!");
  }
  return next({ ctx: { userId: user.id, sessionId: session.id } });
});

interface user extends DatabaseUserAttributes {
  id: string;
}
export const adminAction = actionClient.use(async ({ next }) => {
  const { user, session } = await validateRequest();
  const adminUser = user as user;

  if (!user && adminUser.userType !== "admin") {
    throw new Error("Session is not valid!");
  }
  return next({ ctx: { userId: adminUser.id, sessionId: session?.id } });
});
