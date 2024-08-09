import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }
  return <main>{children}</main>;
};

export default ProtectedLayout;
