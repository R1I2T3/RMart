"use server";
import { getProductById } from "@/data-access/product.persistance";
import { deleteFile } from "@/lib/cloudinary";
import { adminAction } from "@/lib/safe-action";
import { updateProductSchema } from "@/lib/zod/admin";
import { fileUpload } from "@/lib/cloudinary";
import { getCategoryByName } from "@/data-access/admin.persistance";
import { updateProduct } from "@/data-access/admin.persistance";
import { redirect } from "next/navigation";

export const updateProductAction = adminAction
  .schema(updateProductSchema)
  .action(async ({ parsedInput }) => {
    const { currentProduct, error: getProductError } = await getProductById(
      parsedInput.productId
    );
    if (getProductError || !currentProduct) {
      return { error: getProductError || "Product not found" };
    }
    let new_Image;
    if (parsedInput.product_image) {
      await deleteFile(currentProduct.products.productImage);
      new_Image = (await fileUpload(parsedInput.product_image)) as string;
    }
    let newCategory;
    if (parsedInput.category) {
      newCategory = await getCategoryByName(parsedInput.category);
    }
    const updateProductData = {
      productId: parsedInput.productId,
      name: parsedInput.name || currentProduct.products.name,
      description:
        parsedInput.description || currentProduct.products.description,
      price: parsedInput.price?.toString() || currentProduct.products.price,
      quantity: parsedInput.quantity || currentProduct.products.quantity,
      // @ts-ignore
      categoryId: newCategory?.id || currentProduct.categories.id,
      productImage: new_Image || currentProduct.products.productImage,
    };
    const { success, error } = await updateProduct(updateProductData);
    if (error) {
      return { error };
    }
    return redirect(`/product/${parsedInput.productId}`);
  });
