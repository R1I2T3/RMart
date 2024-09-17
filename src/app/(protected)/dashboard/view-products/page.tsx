import React from "react";
import { ProductTable } from "../_components/ProductTable";
import { getProducts } from "@/data-access/product.persistance";
import { redirect } from "next/navigation";
import Link from "next/link";
interface ViewProductPagePropsTypes {
  searchParams: {
    offset: number;
  };
}
const ViewProductPage = async ({ searchParams }: ViewProductPagePropsTypes) => {
  const { products, error } = await getProducts({
    product_category: "",
    q: "",
    offset: searchParams.offset || 0,
  });
  if (error) {
    return redirect("/");
  }
  if (typeof products === "undefined" || products.length === 0) {
    return (
      <section className="w-[85%] m-auto">
        <p>No Product left</p>
        <Link href={`/dashboard/view-products?${searchParams.offset - 1}`}>
          Previous page
        </Link>
      </section>
    );
  }
  return (
    <section className="w-[85%] m-auto">
      <ProductTable data={products} />
    </section>
  );
};

export default ViewProductPage;
