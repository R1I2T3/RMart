import React from "react";
import { LayoutDashboard, PieChartIcon, Plus, Table } from "lucide-react";
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
const AdminSideBar = () => {
  return (
    <div className="w-[20%]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <LayoutDashboard />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-blue-600">
          <SheetHeader>
            <SheetTitle>Admin Dashboard</SheetTitle>
            <SheetDescription hidden={true}>
              This is a admin dashboard navigation
            </SheetDescription>
          </SheetHeader>
          <ul className="flex flex-col gap-3 mt-10">
            <li className="w-full border-white border-2 rounded-xl p-3">
              <SheetClose asChild>
                <Link
                  href={"/dashboard"}
                  className="flex gap-2 text-white text-xl"
                >
                  Analytics <PieChartIcon />
                </Link>
              </SheetClose>
            </li>
            <li className="w-full border-white border-2 rounded-xl p-3">
              <SheetClose asChild>
                <Link
                  href={"/dashboard/create-product"}
                  className="flex gap-2 text-white text-xl"
                >
                  Add Product <Plus />
                </Link>
              </SheetClose>
            </li>
            <li className="w-full border-white border-2 rounded-xl p-3">
              <SheetClose asChild>
                <Link
                  href={"/dashboard/view-products"}
                  className="flex gap-2 text-white text-xl"
                >
                  View Products <Table />
                </Link>
              </SheetClose>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminSideBar;
