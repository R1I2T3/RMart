import React from "react";
import ProfileSideBar from "./_components/ProfileSideBar";
const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex  mt-10 mx-3">
      <ProfileSideBar />
      {children}
    </main>
  );
};

export default ProfileLayout;
