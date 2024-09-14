"use server";
import { authActionClient } from "@/lib/safe-action";
import { getProducts } from "@/data-access/product.persistance";
import { z } from "zod";

const SelectProductSchema = z.object({
  offset: z.number().min(1),
  q: z.string().optional(),
  product_category: z.string().optional(),
});
export const SelectProduct = authActionClient
  .schema(SelectProductSchema)
  .action(async ({ parsedInput }) => {
    const { products, error } = await getProducts(parsedInput);
    if (error) {
      return { error };
    }
    return {
      products: products,
    };
  });
