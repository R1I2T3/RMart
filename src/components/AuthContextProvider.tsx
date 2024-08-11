"use client";

import React, { createContext, useState } from "react";
import { DatabaseUserAttributes } from "@/lib/auth";

export const AuthContext = createContext({
  user: null,
  login: (userData: DatabaseUserAttributes) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DatabaseUserAttributes | null>({
    username: "",
    userType: "",
  });
  const login = (userData: DatabaseUserAttributes) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
