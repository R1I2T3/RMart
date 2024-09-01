"use server";

import { adminAction } from "@/lib/safe-action";
import { deleteProductSchema } from "@/lib/zod/admin";
import { deleteFile } from "@/lib/cloudinary";
import { getProductById } from "@/data-access/product.persistance";
import { deleteProduct } from "@/data-access/admin.persistance";
import { revalidatePath } from "next/cache";
export const deleteProductAction = adminAction
  .schema(deleteProductSchema)
  .action(async ({ parsedInput }) => {
    const { currentProduct, error } = await getProductById(
      parsedInput.productId
    );
    if (!currentProduct || error) {
      return { error };
    }
    await deleteFile(currentProduct.products.productImage);
    const { error: ProductDeletionError } = await deleteProduct(
      currentProduct.products.id
    );
    if (ProductDeletionError) {
      return { error: ProductDeletionError };
    }
    return revalidatePath("/dashboard/view-products", "page");
  });
