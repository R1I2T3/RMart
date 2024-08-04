import "server-only";

interface VerifyAccountUseCaseTypes {
  data: {
    pin: string;
    username: string;
  };
  context: {
    CheckUserIfPresentThenReturnOtp: ({
      username,
    }: {
      username: string;
    }) => Promise<any>;
    DeleteVerificationCodeAndVerifyUser: ({
      id,
      username,
    }: {
      id: string;
      username: string;
    }) => Promise<void>;
  };
}
export const VerifyAccountUseCase = async ({
  data: { pin, username },
  context: {
    CheckUserIfPresentThenReturnOtp,
    DeleteVerificationCodeAndVerifyUser,
  },
}: VerifyAccountUseCaseTypes) => {
  const { verificationCode, error } = await CheckUserIfPresentThenReturnOtp({
    username,
  });
  if (error) {
    return { error };
  }
  if (verificationCode?.verificationCode !== pin) {
    return { error: "Incorrect OTP" };
  }
  await DeleteVerificationCodeAndVerifyUser({
    id: verificationCode.id,
    username: username,
  });
  return { success: "Account verified successfully" };
};
