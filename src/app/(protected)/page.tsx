import React from "react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
const HomePage = async () => {
  return <button className="dark:border-white border-2">HomePage</button>;
};

export default HomePage;
