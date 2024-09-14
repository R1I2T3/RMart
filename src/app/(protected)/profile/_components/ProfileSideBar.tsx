import React from "react";
import { LayoutDashboard, User, ShoppingCart, ListOrdered } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const ProfileSideBar = () => {
  return (
    <div className="w-[10%]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <LayoutDashboard />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-blue-600">
          <SheetHeader>
            <SheetTitle>Profile SideBar</SheetTitle>
            <SheetDescription hidden={true}>
              This is profile side bar
            </SheetDescription>
          </SheetHeader>
          <ul className="flex flex-col gap-3 mt-10">
            <li className="w-full border-white border-2 rounded-xl p-3">
              <SheetClose asChild>
                <Link
                  href={"/profile"}
                  className="flex gap-2 text-white text-xl"
                >
                  Profile <User />
                </Link>
              </SheetClose>
            </li>
            <li className="w-full border-white border-2 rounded-xl p-3">
              <SheetClose asChild>
                <Link
                  href={"/profile/cart"}
                  className="flex gap-2 text-white text-xl"
                >
                  View Cart <ShoppingCart />
                </Link>
              </SheetClose>
            </li>
            <li className="w-full border-white border-2 rounded-xl p-3">
              <SheetClose asChild>
                <Link
                  href={"/profile/cart"}
                  className="flex gap-2 text-white text-xl"
                >
                  Orders <ListOrdered />
                </Link>
              </SheetClose>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfileSideBar;
