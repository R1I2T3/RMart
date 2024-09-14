import { db } from "@/lib/db";
import { category, product } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
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
interface ProductProps {
  product_category?: string;
  q?: string;
  offset: number;
}
export const getProducts = async (props: ProductProps) => {
  try {
    let products;
    if (props.product_category !== undefined && props.product_category !== "") {
      products = await db
        .select({
          id: product.id,
          name: product.name,
          productImage: product.productImage,
          category: category.name,
          created_at: product.created_at,
          price: product.price,
          quantity: product.quantity,
        })
        .from(category)
        .where(eq(category.name, props.product_category))
        .innerJoin(product, eq(product.categoryId, category.id))
        .offset(props.offset * 10)
        .limit(10);
    } else if (props.q !== undefined && props.q !== "") {
      products = await db
        .select({
          id: product.id,
          name: product.name,
          productImage: product.productImage,
          category: category.name,
          created_at: product.created_at,
          price: product.price,
          quantity: product.quantity,
        })
        .from(product)
        .innerJoin(category, eq(product.categoryId, category.id))
        .where(
          sql`to_tsvector('english', ${product.name}) @@ plainto_tsquery('english', ${props.q})`
        )
        .offset(props.offset * 10)
        .limit(10);
    } else {
      products = await db
        .select({
          id: product.id,
          name: product.name,
          productImage: product.productImage,
          category: category.name,
          created_at: product.created_at,
          price: product.price,
          quantity: product.quantity,
        })
        .from(product)
        .innerJoin(category, eq(product.categoryId, category.id))
        .offset(props.offset * 10)
        .limit(10);
    }
    if (typeof products == "undefined" || products?.length == 0) {
      return { error: "Product not found" };
    }
    return {
      products: products.filter((product) => product.created_at !== null),
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
