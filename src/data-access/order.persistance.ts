import { db } from "@/lib/db";
import { order, orderItem } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const CreateOrder = async (userId: string, totalAmount: string) => {
  const createdOrder = (
    await db.insert(order).values({ user_id: userId, totalAmount }).returning({
      orderId: order.id,
    })
  )[0];
  return createdOrder;
};

interface OrderItemsTypes {
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
}
export const InsertOrderItems = async (orderItems: OrderItemsTypes[]) => {
  await db.insert(orderItem).values(orderItems);
};
