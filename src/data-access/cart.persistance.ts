import { db } from "@/lib/db";
import { Cart, CartItems } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export const isCartPresent = async (userId: string) => {
  let cart = (await db.select().from(Cart).where(eq(Cart.userId, userId)))[0];
  return cart;
};

export const createCart = async (userId: string) => {
  const cart = (
    await db
      .insert(Cart)
      .values({
        userId: userId,
      })
      .returning({
        id: Cart.id,
        userId: Cart.userId,
        createdAt: Cart.createdAt,
      })
  )[0];
  return cart;
};

export const checkIfItemInCart = async (cartId: string, productId: string) => {
  const cartItem = (
    await db
      .select()
      .from(CartItems)
      .where(
        and(eq(CartItems.cartId, cartId), eq(CartItems.productId, productId))
      )
  )[0];
  return cartItem;
};

export const addItemInCart = async (cartId: string, productId: string) => {
  await db.insert(CartItems).values({
    cartId: cartId,
    productId: productId,
    quantity: 1,
  });
};

export const IncrementCartItem = async (
  cartItemId: string,
  currentQuantity: number
) => {
  await db
    .update(CartItems)
    .set({ quantity: currentQuantity + 1 })
    .where(eq(CartItems.id, cartItemId));
};
