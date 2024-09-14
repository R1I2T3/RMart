"use server";

import {
  isCartPresent,
  createCart,
  checkIfItemInCart,
  addItemInCart,
  IncrementCartItem,
} from "@/data-access/cart.persistance";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

const AddToCartSchema = z.object({
  product_id: z.string(),
});

export const AddToCartAction = authActionClient
  .schema(AddToCartSchema)
  .action(async ({ parsedInput, ctx }) => {
    let cart = await isCartPresent(ctx.userId);
    if (!cart) {
      cart = await createCart(ctx.userId);
    }
    const isItemIncCart = await checkIfItemInCart(
      cart.id,
      parsedInput.product_id
    );
    if (!isItemIncCart) {
      addItemInCart(cart.id, parsedInput.product_id);
      return { message: "Item successfully added to cart" };
    } else {
      IncrementCartItem(isItemIncCart.id, isItemIncCart.quantity);
      return { message: "Item quantity is increased by 1" };
    }
  });
