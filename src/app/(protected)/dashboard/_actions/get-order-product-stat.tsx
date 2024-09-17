"use server";

import { OrderPlacedByCategory } from "@/data-access/admin.persistance";

export const getOrderProductStatByCategory = async () => {
  const { productDetails } = await OrderPlacedByCategory();
  return { productDetails };
};
