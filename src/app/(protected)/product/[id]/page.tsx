import React from "react";
import { getProductById } from "@/data-access/product.persistance";
import { redirect } from "next/navigation";
import Image from "next/image";
interface ProductPageTypes {
  params: {
    id: string;
  };
}
const ProductPage = async ({ params }: ProductPageTypes) => {
  const { error, currentProduct } = await getProductById(params.id);
  if (error) {
    return redirect("/");
  }
  console.log(currentProduct);

  return (
    <div className="w-[80%] m-auto flex flex-col md:flex-row justify-between items-center">
      <Image
        src={currentProduct?.products.productImage || ""}
        alt="product-image"
        width={80}
        height={90}
      />
    </div>
  );
};

export default ProductPage;
