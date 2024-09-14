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
  console.log(currentProduct);

  return (
    <div className="w-[80%]  min-h-[80dvh] m-auto flex flex-col md:flex-row justify-center lg:justify-between items-center gap-10 my-10">
      <Image
        src={currentProduct?.products.productImage || ""}
        alt="product-image"
        width={350}
        height={350}
        className="rounded-xl size-auto"
      />
      <section>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-clip mb-4">
          {currentProduct?.products.name}
        </h1>
        <h3 className="text-xl font-extrabold">About the Item</h3>
        <p className="text-justify text-md">
          {currentProduct?.products.description}
        </p>
        <br />
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md">
            <strong>Price: </strong>
            {currentProduct?.products.price}
          </h3>
          <h3 className="text-md">
            <strong>Quantity: </strong>
            {currentProduct?.products.quantity}
          </h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md">
            <strong>Item added Date: </strong>
            <br />
            {currentProduct?.products.created_at?.toLocaleDateString()}
          </h3>
          <h3 className="text-md">
            <strong>Category: </strong>
            <br />
            {currentProduct?.categories.name}
          </h3>
        </div>
        <aside className="flex flex-col md:flex-row gap-3 w-full">
          <Button
            className="w-full bg-yellow-300 hover:bg-yellow-500 text-black rounded-xl"
            variant={"destructive"}
          >
            Add to cart
          </Button>
        </aside>
      </section>
    </div>
  );
};

export default ProductPage;
