import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
const ProductTablePagination = ({ table }: { table: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams().toString().split("=");
  const searchParamObj = {
    offset: Number(searchParams.length > 1 ? searchParams[1] : "0"),
  };
  console.log(searchParamObj);

  return (
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          router.push(
            `/dashboard/view-products?offset=${searchParamObj.offset - 1}`
          )
        }
        disabled={searchParamObj.offset == 0}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          router.push(
            `/dashboard/view-products?offset=${searchParamObj.offset + 1}`
          )
        }
        disabled={table.getRowModel().rows.length % 10 !== 0}
      >
        Next
      </Button>
    </div>
  );
};

export default ProductTablePagination;
