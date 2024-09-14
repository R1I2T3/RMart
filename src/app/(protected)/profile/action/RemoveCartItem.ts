"use server";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { DeleteCartItem } from "@/data-access/cart.persistance";
import { revalidatePath } from "next/cache";
const RemoveCartItemSchema = z.object({
  cartItemId: z.string(),
});
export const RemoveCartItem = authActionClient
  .schema(RemoveCartItemSchema)
  .action(async ({ parsedInput }) => {
    await DeleteCartItem(parsedInput.cartItemId);
    revalidatePath("/profile/cart", "page");
  });
