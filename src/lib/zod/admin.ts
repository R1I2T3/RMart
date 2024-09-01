import { z } from "zod";
import { zfd } from "zod-form-data";

export const createProductSchema = zfd.formData({
  name: z.string().min(1, { message: "Product Name is required" }),
  description: z
    .string()
    .min(10, { message: "Minimum length of description should be 100" }),
  price: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
  product_image: zfd.file().refine((file) => file.size < 1024 * 1024 * 2, {
    message: "File must be less than 2 MB",
  }),
  category: z.string(),
});

export const deleteProductSchema = z.object({
  productId: z.string().uuid(),
});
export type createProductType = z.infer<typeof createProductSchema>;
