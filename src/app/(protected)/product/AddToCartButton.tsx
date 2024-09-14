"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AddToCartAction } from "./actions/AddToCart";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import exp from "constants";
const AddToCartButton = ({ productId }: { productId: string }) => {
  const { executeAsync, isExecuting, result } = useAction(AddToCartAction);
  const onAddToCartButton = async () => {
    await executeAsync({ product_id: productId });
    if (result.fetchError || result.serverError) {
      console.log(result);
    } else {
      toast.success(result.data?.message);
    }
  };
  return (
    <Button
      className="w-full bg-yellow-300 hover:bg-yellow-500 disabled:bg-yellow-500 text-black rounded-xl"
      variant={"destructive"}
      onClick={onAddToCartButton}
      disabled={isExecuting}
    >
      {isExecuting ? "Adding to cart..." : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
