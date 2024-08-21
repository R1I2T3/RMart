"use server";

import { adminAction } from "@/lib/safe-action";
import { createProductSchema } from "@/lib/zod/admin";
import {
  createProduct,
  getCategoryByName,
} from "@/data-access/admin.persistance";
import { fileUpload } from "@/lib/cloudinary";
export const CreateProductAction = adminAction
  .schema(createProductSchema)
  .action(async ({ parsedInput }) => {
    const { selectedCategory, error } = await getCategoryByName(
      parsedInput.category
    );
    if (error || !selectedCategory) {
      throw new Error(error);
    }
    const imageUrl = (await fileUpload(parsedInput.product_image)) as string;
    if (!imageUrl) {
      throw new Error("Failed to upload product image");
    }
    const { message } = await createProduct({
      name: parsedInput.name,
      description: parsedInput.description,
      categoryId: selectedCategory?.id,
      price: parsedInput.price.toString(),
      quantity: parsedInput.quantity,
      productImage: imageUrl,
    });
    return { message };
  });
