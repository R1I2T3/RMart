import React from "react";
import VerifyAccount from "../_components/verify_otp";
import ForgotPasswordContainer from "../_components/ForgotPasswordContainer";
import { Suspense } from "react";
const LoginPage = () => {
  return (
    <ForgotPasswordContainer>
      <Suspense fallback={<div>Loading</div>}>
        <VerifyAccount />
      </Suspense>
    </ForgotPasswordContainer>
  );
};

export default LoginPage;
