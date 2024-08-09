import "server-only";
import { VerificationParameters } from "@/lib/mails/sendVerificationToken";
import { userSelectType } from "@/lib/db/schema";
import bcrypt from "bcrypt";
interface ForgotPasswordEmailInputUseCaseType {
  data: { email: string };
  context: {
    CheckIfUserIsPresent: ({ email }: { email: string }) => Promise<any>;
    SendVerificationCode: (fields: VerificationParameters) => Promise<void>;
  };
}

interface NewPasswordInputUseCaseTypes {
  data: { password: string; id: string };
  context: {
    getUserById: (id: string) => Promise<userSelectType>;
    UpdatePassword: ({
      newHashedPassword,
      email,
    }: {
      newHashedPassword: string;
      email: string;
    }) => Promise<void>;
  };
}
export const ForgotPasswordEmailInputUseCase = async ({
  data,
  context,
}: ForgotPasswordEmailInputUseCaseType) => {
  const user = await context.CheckIfUserIsPresent({ email: data.email });
  if (!user || !user.users) {
    return { error: "User not found with this email" };
  }
  await context.SendVerificationCode({
    email: user.users.email,
    purpose: "forgot-password",
    db_purpose: "Forgot password",
    username: user.users.username,
    id: user.users.id,
  });
  return { username: user.users.username };
};

export const NewPasswordInputUseCase = async ({
  data,
  context,
}: NewPasswordInputUseCaseTypes) => {
  const currentUser = await context.getUserById(data.id);
  if (!currentUser) {
    return { error: "Invalid cookie" };
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  await context.UpdatePassword({
    newHashedPassword: hashedPassword,
    email: currentUser.email,
  });
  return { success: true };
};
