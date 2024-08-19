import React from "react";
import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
import { redirect } from "next/navigation";
import AdminSideBar from "./_components/AdminSideBar";
const AdminDashBoardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = await validateRequest();
  if (user?.userType !== "admin") {
    return redirect("/");
  }
  return (
    <main className="flex  mt-10 mx-3">
      <AdminSideBar />
      {children}
    </main>
  );
};

export default AdminDashBoardLayout;
