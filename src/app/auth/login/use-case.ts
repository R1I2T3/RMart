import "server-only";
import { scrypt } from "@/lib/auth/utils";

interface LoginUseCaseTypes {
  data: {
    email: string;
    password: string;
  };
  context: {
    CheckIfUserIsPresent: ({ email }: { email: string }) => Promise<any>;
  };
}
export const LoginUseCase = async ({ data, context }: LoginUseCaseTypes) => {
  const user = await context.CheckIfUserIsPresent({
    email: data.email,
  });
  if (!user) {
    return { error: "Invalid credentials" };
  }

  const isPasswordCorrect = await scrypt.verify(
    user?.email_users.password,
    data.password
  );
  if (!isPasswordCorrect) {
    return { error: "Invalid Credentials" };
  }
  if (!user.users.isVerified) {
    return { error: "You need to verify your account" };
  }
  return { success: true, id: user.users.id };
};
