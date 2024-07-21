import React from "react";
import VerifyAccount from "../_components/verify_otp";
import ForgotPasswordContainer from "../_components/ForgotPasswordContainer";
const LoginPage = () => {
  return (
    <ForgotPasswordContainer>
      <VerifyAccount />
    </ForgotPasswordContainer>
  );
};

export default LoginPage;
