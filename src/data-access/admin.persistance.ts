import { db } from "@/lib/db";
import { category, product } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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
