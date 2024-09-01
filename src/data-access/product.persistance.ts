import { db } from "@/lib/db";
import { category, product } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
export const getProductById = async (id: string) => {
  try {
    const currentProduct = (
      await db
        .select()
        .from(product)
        .innerJoin(category, eq(category.id, product.categoryId))
        .where(eq(product.id, id))
    )[0];
    if (!currentProduct) {
      return { error: "Product not found" };
    }
    return { currentProduct };
  } catch (error) {
    return { error };
  }
};

export const getProducts = async () => {
  try {
    const products = await db
      .select({
        id: product.id,
        name: product.name,
        productImage: product.productImage,
        category: category.name,
        created_at: product.created_at,
      })
      .from(product)
      .innerJoin(category, eq(product.categoryId, category.id));
    if (products.length == 0) {
      throw new Error("Create some product");
    }
    return {
      products: products.filter((product) => product.created_at !== null),
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
