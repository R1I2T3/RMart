import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditProductForm from "./EditProductForm";
import { getProductById } from "@/data-access/product.persistance";
import { redirect } from "next/navigation";
interface Props {
  params: {
    id: string;
  };
}
const UpdateProductPage = async ({ params }: Props) => {
  const { currentProduct, error } = await getProductById(params.id);
  if (error || !currentProduct) {
    return redirect("/");
  }
  return (
    <Card className="w-[100%] md:w-[70%] lg:w-[50%] shadow-xl  m-auto my-10">
      <CardHeader>
        <CardTitle className="m-auto text-2xl md:text-3xl lg:text-4xl text-blue-500 dark:text-blue-600">
          Edit Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditProductForm data={currentProduct} />
      </CardContent>
    </Card>
  );
};

export default UpdateProductPage;
