import "server-only";
import { signupType } from "@/lib/zod/auth";
import { createUserArgsType } from "@/types/auth";
import { scrypt } from "@/lib/auth/utils";
import { generateIdFromEntropySize } from "lucia";
import { createUser } from "@/data-access/user.persistance";

type createUserReturnType = {
  username: string;
  userType: string | null;
};
interface SignupUseCaseType {
  context: {
    isUserPresent: (email: string, username: string) => Promise<boolean>;
    createUser: (data: createUserArgsType) => Promise<createUserReturnType>;
  };
  data: signupType;
}

export const signupUseCase = async ({ context, data }: SignupUseCaseType) => {
  const isUserPresent = await context.isUserPresent(data.email, data.username);
  if (isUserPresent) {
    return { error: "User with email " };
  }
  const hashedPassword = await scrypt.hash(data.password);
  const userId = await generateIdFromEntropySize(10);
  const { username } = await createUser({
    id: userId,
    password: hashedPassword,
    username: data.username,
    email: data.email,
  });
  return { username, userId };
};
