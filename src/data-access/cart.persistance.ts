import { db } from "@/lib/db";
import { Cart, CartItems, product } from "@/lib/db/schema";
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

export const getCartItems = async (userId: string) => {
  const cartItems = await db
    .select({
      cartId: Cart.id,
      cartItemsId: CartItems.id,
      quantity: CartItems.quantity,
      name: product.name,
      price: product.price,
      productImage: product.productImage,
      productId: product.id,
    })
    .from(Cart)
    .where(eq(Cart.userId, userId))
    .innerJoin(CartItems, eq(CartItems.cartId, Cart.id))
    .innerJoin(product, eq(product.id, CartItems.productId));
  return cartItems;
};

export const decrementCartItem = async (
  cartItemId: string,
  currentQuantity: number
) => {
  if (currentQuantity > 1) {
    await db
      .update(CartItems)
      .set({ quantity: currentQuantity - 1 })
      .where(eq(CartItems.id, cartItemId));
  }
};

export const DeleteCartItem = async (cartItemId: string) => {
  await db.delete(CartItems).where(eq(CartItems.id, cartItemId));
};

export const emptyCart = async (cartId: string) => {
  await db.transaction(async (tx) => {
    await tx.delete(CartItems).where(eq(CartItems.cartId, cartId));
    await tx.delete(Cart).where(eq(Cart.id, cartId));
  });
};
