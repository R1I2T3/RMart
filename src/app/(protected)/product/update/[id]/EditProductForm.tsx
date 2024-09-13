"use client";

import React from "react";
import InputFormControl from "@/components/FormControl/Input";
import TextArea from "@/components/FormControl/TextArea";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormControl from "@/components/FormControl/Select";
import { categories } from "@/constants";
import { objectToFormData, getUpdatedValues } from "@/utils";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProductSchema, updateProductType } from "@/lib/zod/admin";
import { updateProductAction } from "./action";
import { ProductTypes } from "@/types";
interface EditProductProps {
  data: ProductTypes;
}
const EditProductForm = ({ data }: EditProductProps) => {
  const router = useRouter();
  const { executeAsync, isExecuting, result } = useAction(updateProductAction);
  const form = useForm<updateProductType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      productId: data.products?.id,
      name: data.products?.name,
      description: data.products?.description,
      price: parseFloat(data.products?.price),
      quantity: data.products.quantity,
      category: data.categories.name,
    },
  });
  const onSubmit = async (values: updateProductType) => {
    const updatedValues = getUpdatedValues(
      { ...data.products, category: data.categories.name },
      values
    );
    executeAsync(objectToFormData({ ...updatedValues, id: data.products.id }));
    if (result.data?.error || result.serverError) {
      // @ts-ignore
      toast.error(result.serverError || result.data?.error);
    }
  };
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="New Name for product" name="name" />
          <InputFormControl label="New Price" name="price" type="number" />
          <InputFormControl
            label="New Quantity"
            name="quantity"
            type="number"
          />
          <InputFormControl
            label="Updated Product image"
            name="product_image"
            type="file"
          />
          <SelectFormControl
            options={categories}
            placeholder="Select the new category of product"
            name="category"
            label="Category"
          />
          <TextArea
            label="Description"
            name="description"
            placeholder="Enter the updated description of product"
          />
        </FormProvider>
        <Button
          className="w-full bg-green-500 my-3 p-2 hover:bg-green-600"
          type="submit"
          disabled={isExecuting}
        >
          {isExecuting ? "Updating product" : "Update product"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProductForm;
