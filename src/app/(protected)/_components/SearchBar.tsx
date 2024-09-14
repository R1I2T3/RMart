"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
const HomeScreenSearchBar = ({ search }: { search: string }) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search || "");
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query) {
      router.push(`/`);
    } else {
      router.push(`/?q=${query}`);
    }
  }, [query]);
  return (
    <div className="w-[100%] flex justify-center items-center gap-3 my-5">
      <Input
        type="text"
        className="w-[90%] md:w-[50%] lg:w-[40%]  rounded-xl p-6   focus:ring-green-600 focus:ring-2"
        placeholder="Enter the Name of  of item you want to search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default HomeScreenSearchBar;
