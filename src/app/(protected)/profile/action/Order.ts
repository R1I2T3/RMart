"use server";
import { CreateOrder, InsertOrderItems } from "@/data-access/order.persistance";
import { getCartItems, emptyCart } from "@/data-access/cart.persistance";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
const CartToOrderSchema = z.object({
  cartId: z.string(),
  totalAmount: z.string(),
});

export const CartToOrder = authActionClient
  .schema(CartToOrderSchema)
  .action(async ({ parsedInput, ctx }) => {
    const newOrder = await CreateOrder(ctx.userId, parsedInput.totalAmount);
    const cartItems = (await getCartItems(ctx.userId)).map((item) => ({
      orderId: newOrder.orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    await InsertOrderItems(cartItems);
    await emptyCart(parsedInput.cartId);
    return revalidatePath("/profile/order", "page");
  });
