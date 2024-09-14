import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProductForm from "../_components/AddProductForm";
const CreateProduct = () => {
  return (
    <Card className="w-[90%] md:w-[70%] lg:w-[50%] shadow-xl mb-10">
      <CardHeader>
        <CardTitle className="m-auto text-2xl md:text-3xl lg:text-4xl text-blue-500 dark:text-blue-600">
          Add Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddProductForm />
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
