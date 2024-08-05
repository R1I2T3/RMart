import React from "react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
const HomePage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/auth/login");
  }
  return <button className="dark:border-white border-2">HomePage</button>;
};

export default HomePage;
