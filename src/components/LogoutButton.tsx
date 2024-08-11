import React from "react";
import { Button } from "./ui/button";
import { LogoutAction } from "@/app/(protected)/action";
import { useAction } from "next-safe-action/hooks";

const LogoutButton = ({ logout }: { logout: () => void }) => {
  const { execute, result } = useAction(LogoutAction);
  const onLogoutButtonClick = () => {
    execute();
    logout();
  };
  return (
    <Button className="rounded-xl p-3 w-full " onClick={onLogoutButtonClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
