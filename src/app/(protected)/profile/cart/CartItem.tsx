"use client";
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { RemoveCartItem } from "../action/RemoveCartItem";
import { IncrementCartItemAction } from "../action/IncrementCartItem";
import { DecrementAction } from "../action/DecrementCartItem";
const CartItem = ({ item }) => {
  const { executeAsync: addToCartFunc, isExecuting: isAdding } = useAction(
    IncrementCartItemAction
  );
  const { executeAsync: decrementFunc, isExecuting: isDecrementing } =
    useAction(DecrementAction);
  const { executeAsync: deleteFunc, isExecuting: isDeleting } =
    useAction(RemoveCartItem);
  const onDeleteButtonClick = async () => {
    await deleteFunc({ cartItemId: item.cartItemsId });
  };
  const onDecrementButtonClick = async () => {
    await decrementFunc({
      cartItemId: item.cartItemsId,
      currentQuantity: item.quantity,
    });
  };

  const onAddButtonClick = async () => {
    await addToCartFunc({
      product_id: item.productId,
    });
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 mb-3">
      <div className="flex items-center space-x-4 mb-3">
        <Image
          src={item.productImage}
          alt={item.name}
          height={60}
          width={60}
          className="size-auto object-cover rounded-lg shadow-sm"
        />
        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <p className="text-primary font-medium mt-1">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onDecrementButtonClick}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <Button variant="outline" size="icon" onClick={onAddButtonClick}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDeleteButtonClick}
          className="hover:opacity-50 disabled:opacity-50"
          disabled={isDeleting}
        >
          <Trash2 className="h-5 w-5 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
