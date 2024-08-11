"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContextProvider";

export const SetUserProvider = ({
  children,
  username,
  userType,
}: {
  children: React.ReactNode;
  username: string;
  userType: string;
}) => {
  const { login } = useContext(AuthContext);
  useEffect(() => {
    login({ username, userType });
  }, []);
  return <>{children}</>;
};
