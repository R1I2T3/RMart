"use client";
import React, { useState, useRef, useEffect } from "react";
import { categories } from "@/constants";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const CategorySelect = () => {
  const [selected, setSelected] = useState("");
  const initialRender = useRef(true);
  const router = useRouter();
  const onClick = (category: string) => {
    if (selected === category) {
      setSelected("");
    } else {
      setSelected(category);
    }
  };
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!selected) {
      router.push(`/`);
    } else {
      router.push(`/?category=${selected}`);
    }
  }, [selected]);
  return (
    <section className="flex gap-3 overflow-x-auto whitespace-nowrap py-2 px-4 w-[100dvw] hide-scrollbar">
      {categories.map((category, index) => (
        <Button
          key={category}
          variant={"outline"}
          onClick={() => onClick(category)}
          className={`flex-shrink-0 hover:bg-primary/30 ${
            selected === category ? "bg-primary/30" : "bg-transparent"
          }`}
        >
          {category}
        </Button>
      ))}
    </section>
  );
};

export default CategorySelect;
