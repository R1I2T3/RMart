import Image from "next/image";
import React from "react";
import Link from "next/link";
interface ProductCardProps {
  name: string;
  category: string;
  productImage: string;
  productId: string;
  price: string;
  quantity: number;
}
const ProductCard = (props: ProductCardProps) => {
  return (
    <Link
      href={`/product/${props.productId}`}
      className="flex justify-between items-center p-3 gap-3 w-full  mx-auto shadow-xl rounded-xl dark:border-white/30 border-black/40  border-2 hover:opacity-50 "
    >
      <Image
        src={props.productImage}
        alt={`Image of ${props.name}`}
        height={400}
        width={400}
        className="size-[60%] rounded-2xl"
      />
      <section className="flex flex-col gap-3">
        <h2>
          <strong>Name:</strong>
          {props.name}
        </h2>
        <h3>
          <strong>Category:</strong>
          {props.category}
        </h3>
        <h3>
          <strong>Price:</strong> ₹{props.price}
        </h3>
        <h3>
          <strong>Quantity:</strong> {props.quantity}
        </h3>
      </section>
    </Link>
  );
};

export default ProductCard;
