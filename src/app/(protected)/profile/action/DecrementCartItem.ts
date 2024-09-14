"use server";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { decrementCartItem } from "@/data-access/cart.persistance";
import { revalidatePath } from "next/cache";
const decrementSchema = z.object({
  cartItemId: z.string(),
  currentQuantity: z.number(),
});
export const DecrementAction = authActionClient
  .schema(decrementSchema)
  .action(async ({ parsedInput, ctx }) => {
    await decrementCartItem(
      parsedInput.cartItemId,
      parsedInput.currentQuantity
    );
    return revalidatePath("/profile/cart", "page");
  });
