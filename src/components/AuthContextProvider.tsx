"use client";

import React, { createContext, useState } from "react";
import { DatabaseUserAttributes } from "@/lib/auth";

interface AuthContextType {
  user: DatabaseUserAttributes | null;
  login: (userData: DatabaseUserAttributes) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DatabaseUserAttributes | null>(null);

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
