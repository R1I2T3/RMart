import React from "react";
import { getProductById } from "@/data-access/product.persistance";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="w-[80%]  m-auto flex flex-col md:flex-row justify-center lg:justify-between items-center gap-10">
      <Image
        src={currentProduct?.products.productImage || ""}
        alt="product-image"
        width={600}
        height={600}
      />
      <section>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-clip mb-4">
          {currentProduct?.products.name}
        </h1>
        <h3 className="text-md font-bold">About the Item</h3>
        <p className="text-justify text-sm">
          {currentProduct?.products.description}
        </p>
      </section>
      <aside className="flex flex-col gap-3 w-full">
        <Button className="w-full bg-yellow-300 hover:bg-yellow-500 text-black rounded-xl">
          Add to cart
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl">
          Buy now
        </Button>
      </aside>
    </div>
  );
};

export default ProductPage;
