import "server-only";
import { signupType } from "@/lib/zod/auth";
import { createUserArgsType } from "@/types";
import { generateIdFromEntropySize } from "lucia";
import { createUser } from "@/data-access/user.persistance";
import { userSelectType } from "@/lib/db/schema";
import bcrypt from "bcrypt";
type createUserReturnType = {
  username: string;
  userType: string | null;
};
interface SignupUseCaseType {
  context: {
    isUserPresent: (email: string, username: string) => Promise<userSelectType>;
    createUser: (data: createUserArgsType) => Promise<createUserReturnType>;
  };
  data: signupType;
}

export const signupUseCase = async ({ context, data }: SignupUseCaseType) => {
  const isUserPresent = await context.isUserPresent(data.email, data.username);
  if (isUserPresent) {
    return { error: "User with email " };
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userId = await generateIdFromEntropySize(10);
  const { username } = await createUser({
    id: userId,
    password: hashedPassword,
    username: data.username,
    email: data.email,
  });
  return { username, userId };
};
