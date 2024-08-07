import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
const SocialAuthFooter = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Separator className="w-[45%] bg-green-500" />
        <p>OR</p>
        <Separator className="w-[45%] bg-green-500" />
      </div>
      <div className="w-full h-[45px] bg-white  hover:bg-green-200 flex justify-center items-center">
        <Link href="/api/auth/google" className="">
          <Image
            src={"/google-icon.png"}
            width={35}
            height={35}
            alt="google"
            className="rounded-full shadow-xl m-auto"
          />
        </Link>
      </div>
    </>
  );
};

export default SocialAuthFooter;
