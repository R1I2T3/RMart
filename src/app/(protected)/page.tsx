import React from "react";
import { getProducts } from "@/data-access/product.persistance";
import { notFound } from "next/navigation";
import HomeScreenSearchBar from "./_components/SearchBar";
import ProductSection from "./_components/ProductSection";
import CategorySelect from "./_components/CategorySelect";
interface HomePageProps {
  searchParams: {
    q: string;
    category: string;
  };
}
const HomePage = async ({ searchParams: { q, category } }: HomePageProps) => {
  const { products, error } = await getProducts({
    product_category: category,
    q,
    offset: 0,
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <HomeScreenSearchBar search={q} />
      <CategorySelect />
      <li
        key={Math.random()}
        className="w-[100%] h-full m-auto list-none my-10"
      >
        <ProductSection
          initialData={products}
          q={q}
          category={category}
          error={error as string}
        />
      </li>
    </div>
  );
};

export default HomePage;
