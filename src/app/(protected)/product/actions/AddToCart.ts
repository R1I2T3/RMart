"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { db } from "@/lib/db";
import { Cart, CartItems } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
const AddToCartSchema = z.object({
  product_id: z.string(),
});

export const AddToCartAction = authActionClient
  .schema(AddToCartSchema)
  .action(async ({ parsedInput, ctx }) => {
    let cart = (
      await db.select().from(Cart).where(eq(Cart.userId, ctx.userId))
    )[0];
    if (!cart) {
      cart = (
        await db
          .insert(Cart)
          .values({
            userId: ctx.userId,
          })
          .returning({
            id: Cart.id,
            userId: Cart.userId,
            createdAt: Cart.createdAt,
          })
      )[0];
    }
    const isItemIncCart = (
      await db
        .select()
        .from(CartItems)
        .where(
          and(
            eq(CartItems.cartId, cart.id),
            eq(CartItems.productId, parsedInput.product_id)
          )
        )
    )[0];
    if (!isItemIncCart) {
      await db.insert(CartItems).values({
        cartId: cart.id,
        productId: parsedInput.product_id,
        quantity: 1,
      });
      return { message: "Item successfully added to cart" };
    } else {
      await db
        .update(CartItems)
        .set({ quantity: isItemIncCart.quantity + 1 })
        .where(eq(CartItems.id, isItemIncCart.id));
      return { message: "Item quantity is increased by 1" };
    }
  });
