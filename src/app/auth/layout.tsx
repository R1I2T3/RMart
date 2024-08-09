import React from "react";
import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
import { redirect } from "next/navigation";
const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <main className="min-h-[85dvh] flex justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
