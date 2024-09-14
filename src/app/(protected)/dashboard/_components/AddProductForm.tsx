"use client";
import React from "react";
import InputFormControl from "@/components/FormControl/Input";
import TextArea from "@/components/FormControl/TextArea";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, createProductType } from "@/lib/zod/admin";
import SelectFormControl from "@/components/FormControl/Select";
import { categories } from "@/constants";
import { objectToFormData } from "@/utils";
import { CreateProductAction } from "../_actions/create-product";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const AddProductForm = () => {
  const { executeAsync, isExecuting, result } = useAction(CreateProductAction);
  const router = useRouter();
  const form = useForm<createProductType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
    },
  });
  const onSubmit = async (values: createProductType) => {
    await executeAsync(objectToFormData(values));
    if (result.serverError || result.validationErrors) {
      const errorMessage = "Some server side error taken place";
      toast.error(errorMessage);
    }
    toast.success(result.data?.message || "Product added to database");
    router.replace("/dashboard/view-products");
  };
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="Name of product" name="name" />
          <InputFormControl label="Price" name="price" type="number" />
          <InputFormControl label="Quantity" name="quantity" type="number" />
          <InputFormControl
            label="Product image"
            name="product_image"
            type="file"
          />
          <SelectFormControl
            options={categories}
            placeholder="Select the categories of product"
            name="category"
            label="Category"
          />
          <TextArea
            label="Description"
            name="description"
            placeholder="Enter the description of product"
          />
        </FormProvider>
        <Button
          className="w-full bg-green-500 my-3 p-2 hover:bg-green-600"
          type="submit"
          disabled={isExecuting}
        >
          {isExecuting ? "Adding Product" : "Add product"}
        </Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
