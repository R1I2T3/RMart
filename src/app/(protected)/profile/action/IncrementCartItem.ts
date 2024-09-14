"use server";
import { authActionClient } from "@/lib/safe-action";
import { isCartPresent } from "@/data-access/cart.persistance";
import {
  IncrementCartItem,
  checkIfItemInCart,
} from "@/data-access/cart.persistance";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const AddToCartSchema = z.object({
  product_id: z.string(),
});

export const IncrementCartItemAction = authActionClient
  .schema(AddToCartSchema)
  .action(async ({ parsedInput, ctx }) => {
    let cart = await isCartPresent(ctx.userId);
    const isItemIncCart = await checkIfItemInCart(
      cart.id,
      parsedInput.product_id
    );
    IncrementCartItem(isItemIncCart.id, isItemIncCart.quantity);
    revalidatePath("/profile/cart", "page");
  });
