import { db } from "@/lib/db";
import { category, order, orderItem, product } from "@/lib/db/schema";
import { countDistinct, eq, sum } from "drizzle-orm";
export const getCategoryByName = async (name: string) => {
  const selectedCategory = (
    await db.select().from(category).where(eq(category.name, name))
  )[0];
  if (!selectedCategory) {
    return { error: "Category of following not found" };
  }
  return { selectedCategory };
};

interface createProductTypes {
  name: string;
  description: string;
  price: string;
  quantity: number;
  categoryId: string;
  productImage: string;
}
interface updateProductTypes extends createProductTypes {
  productId: string;
}
export const createProduct = async (data: createProductTypes) => {
  await db.insert(product).values(data);
  return { message: "Product created successfully" };
};

export const deleteProduct = async (productId: string) => {
  try {
    await db.delete(product).where(eq(product.id, productId));
    return { success: "Product deleted successfully" };
  } catch (error) {
    return { error };
  }
};

export const updateProduct = async (updateProductData: updateProductTypes) => {
  try {
    await db
      .update(product)
      .set({ ...updateProductData })
      .where(eq(product.id, updateProductData.productId));
    return { success: "Product updated successfully" };
  } catch (error) {
    return { error };
  }
};

export const OrderPlacedByCategory = async () => {
  const productDetails = await db
    .select({ categoryName: category.name, count: countDistinct(order.id) })
    .from(order)
    .innerJoin(orderItem, eq(orderItem.orderId, order.id))
    .innerJoin(product, eq(product.id, orderItem.productId))
    .innerJoin(category, eq(category.id, product.categoryId))
    .groupBy(category.name)
    .orderBy(category.name);
  return { productDetails };
};

export const getOrderByDate = async () => {
  const orderByDate = await db
    .select({ orderDate: order.orderDate, count: countDistinct(order.id) })
    .from(order)
    .groupBy(order.orderDate)
    .orderBy(order.orderDate);
  return { orderByDate };
};

export const salesMadePerDay = async () => {
  const sales = await db
    .select({ orderDate: order.orderDate, totalPrice: sum(order.totalAmount) })
    .from(order)
    .groupBy(order.orderDate)
    .orderBy(order.orderDate);
  return { sales };
};
