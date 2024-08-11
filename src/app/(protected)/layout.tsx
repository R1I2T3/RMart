import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
import { redirect } from "next/navigation";
import { SetUserProvider } from "@/components/SetUserProvider";
const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <main>
      <SetUserProvider username={user.username} userType={user.userType}>
        {children}
      </SetUserProvider>
    </main>
  );
};

export default ProtectedLayout;
