"use client";
import React from "react";
import { MessageSquareWarning } from "lucide-react";
import { useRouter } from "next/navigation";
const NotFound = () => {
  const router = useRouter();
  return (
    <main className="min-h-[85dvh] flex flex-col gap-3 justify-center items-center">
      <MessageSquareWarning size={100} className="text-yellow-500" />
      <h1 className="text-2xl">Page not found</h1>
      <button
        className="text-blue-500 hover:underline underline-offset-2"
        onClick={() => router.back()}
      >
        Go back to previous page
      </button>
    </main>
  );
};

export default NotFound;
