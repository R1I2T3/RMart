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

export const getUserOrders = async (userId: string) => {
  const orders = await db.select().from(order).where(eq(order.user_id, userId));
  return orders;
};

export const getOrderDetails = async (orderId: string) => {
  const orderDetails = await db
    .select()
    .from(order)
    .innerJoin(orderItem, eq(orderItem.orderId, order.id))
    .where(eq(order.id, orderId));
  return orderDetails;
};
