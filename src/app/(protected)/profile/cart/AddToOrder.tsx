"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { CartToOrder } from "../action/Order";
import { toast } from "sonner";
const AddToOrderButton = ({
  totalAmount,
  cartId,
}: {
  totalAmount: string;
  cartId: string;
}) => {
  const { executeAsync, isExecuting, result } = useAction(CartToOrder);
  const onOrderButtonClick = async () => {
    await executeAsync({ totalAmount, cartId });
    if (result.fetchError || result.serverError) {
      toast.error(
        "Some error taken place while placing order please try again later"
      );
    } else {
      toast.success("Order placed successfully");
    }
  };
  return (
    <Button
      className="w-full mt-4 bg-blue-600 hover:bg-blue-800 disabled:bg-blue-800 text-white"
      size="lg"
      onClick={onOrderButtonClick}
      disabled={isExecuting}
    >
      Order
    </Button>
  );
};

export default AddToOrderButton;
