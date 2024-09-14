"use client";

import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
const UserNavigation = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();
  if (!user?.username) {
    return;
  }
  return (
    <ul className="hidden md:flex justify-between items-center gap-5">
      <li>
        <Link
          href={"/"}
          className={` hover:text-white ${
            pathname === "/" ? "text-white" : "text-blue-200"
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/profile"}
          className={` hover:text-white ${
            pathname === "/profile" ? "text-white" : "text-blue-200"
          }`}
        >
          Profile
        </Link>
      </li>
      {user.userType == "admin" ? (
        <li>
          <Link
            href={"/dashboard"}
            className={` hover:text-white ${
              pathname === "/dashboard" ? "text-white" : "text-blue-200"
            }`}
          >
            Dashboard
          </Link>
        </li>
      ) : (
        ""
      )}
      <LogoutButton logout={logout} />
    </ul>
  );
};

export default UserNavigation;
