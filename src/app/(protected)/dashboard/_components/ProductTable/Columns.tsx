"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, EyeIcon, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { formatDate } from "@/utils";
import DeleteProductButton from "./DeleteProductButton";
export type Product = {
  id: string;
  name: string;
  productImage: string;
  category: string;
  created_at: Date | null;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productImage",
    header: "Product Image",
    cell: (info) => (
      <Image
        src={info.getValue() || ""}
        alt={`Image of ${info.row.original.name}`}
        width={100}
        height={100}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "created_at",
    header: "CreatedAt",
    cell: (info) => {
      return formatDate(info.getValue());
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              href={`/product/${product.id}`}
              className="flex gap-3 items-center m-3 hover:bg-background/45"
            >
              View Product
              <EyeIcon />
            </Link>
            <Link
              href={`/product/update/${product.id}`}
              className="flex gap-3 items-center m-3 hover:bg-background/45"
            >
              Update Product
              <Pencil size={20} />
            </Link>
            <DeleteProductButton id={product.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
