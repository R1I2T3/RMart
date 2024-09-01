import React from "react";
import { ProductTable } from "../_components/ProductTable";
import { getProducts } from "@/data-access/product.persistance";
import { redirect } from "next/navigation";
const ViewProductPage = async () => {
  const { products, error } = await getProducts();
  if (error || typeof products === "undefined") {
    return redirect("/");
  }
  return (
    <section className="w-[85%] m-auto">
      <ProductTable data={products} />
    </section>
  );
};

export default ViewProductPage;
