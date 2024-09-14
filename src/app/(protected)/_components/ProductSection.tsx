"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { notFound } from "next/navigation";
import ProductCard from "./ProductCard";
import { SelectProduct } from "../select_product";
import { useAction } from "next-safe-action/hooks";
interface ProductsPageSectionProps {
  initialData: any;
  q?: string;
  category?: string;
  error?: string;
}
interface Products {
  name: string;
  category: string;
  productImage: string;
  id: number;
  price: string;
  quantity: number;
}
[];
const ProductSection = ({
  initialData,
  q = "",
  category = "",
  error = "",
}: ProductsPageSectionProps) => {
  const [pages, setPages] = useState<Products[]>([...(initialData || [])]);
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  const [canFetch, setCanFetch] = useState(true);
  const { executeAsync, result, isExecuting } = useAction(SelectProduct);
  useEffect(() => {
    if (!canFetch) return;
    if (inView) {
      const fetchData = async () => {
        const result = await executeAsync({
          offset: page + 1,
          product_category: category,
          q,
        });
        if (!result) {
          return setCanFetch(false);
        }
        if (
          result.data?.error ||
          !result.data?.products ||
          result.data?.products?.length == 0 ||
          result.data?.products?.length % 10 !== 0
        ) {
          console.log("I am here");
          setCanFetch(false);
        }
        //  @ts-ignore
        if (result.data?.products?.length >= 0) {
          setPages((prev) => [
            ...(prev?.length ? prev : []),
            ...result.data?.products,
          ]);
          setPage((prev) => prev + 1);
        }
      };
      fetchData();
    }
  }, [inView, q, page, canFetch, category]);
  if (error) {
    if (error == "Product not found") {
      return (
        <h1 className="text-2xl  w-full flex justify-center items-center">
          No products found
        </h1>
      );
    }
    return notFound();
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  w-[90%] m-auto gap-10">
        {pages.length !== 0
          ? pages.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category}
                productImage={product.productImage}
                productId={product.id}
                price={product.price}
                quantity={product.quantity}
              />
            ))
          : ""}
      </div>
      <div ref={ref}>
        {isExecuting && (
          <span className="loading loading-spinner m-auto"></span>
        )}
      </div>
    </>
  );
};

export default ProductSection;
