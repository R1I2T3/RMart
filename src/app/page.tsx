"use client";
import { useTheme } from "next-themes";
import React from "react";
const HomePage = () => {
  const { setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme("dark")}
      className="dark:border-white border-2"
    >
      HomePage
    </button>
  );
};

export default HomePage;
