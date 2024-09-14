"use client";

import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "./AuthContextProvider";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
const MobileUserNavigation = () => {
  const pathname = usePathname();
  const { user, logout } = useContext(AuthContext);
  if (!user?.username) {
    return;
  }
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 w-[100%]">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetHeader>
          <SheetDescription hidden={true}>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <SheetContent className="flex flex-col bg-blue-600" side={"top"}>
          <ul className="flex flex-col gap-3 mt-3">
            <li className="p-3 border-2 rounded-xl border-white">
              <SheetClose asChild>
                <Link
                  href={"/"}
                  className={` hover:text-white ${
                    pathname === "/" ? "text-white" : "text-blue-200"
                  }`}
                >
                  Home
                </Link>
              </SheetClose>
            </li>
            <li className="p-3 border-2 rounded-xl border-white">
              <SheetClose asChild>
                <Link
                  href={"/profile"}
                  className={` hover:text-white ${
                    pathname === "/profile" ? "text-white" : "text-blue-200"
                  }`}
                >
                  Profile
                </Link>
              </SheetClose>
            </li>
            {user.userType == "admin" ? (
              <li className="p-3 border-2 rounded-xl border-white">
                <SheetClose asChild>
                  <Link
                    href={"/dashboard"}
                    className={` hover:text-white ${
                      pathname === "/dashboard" ? "text-white" : "text-blue-200"
                    }`}
                  >
                    Dashboard
                  </Link>
                </SheetClose>
              </li>
            ) : (
              ""
            )}
            <li>
              <LogoutButton logout={logout} />
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileUserNavigation;
