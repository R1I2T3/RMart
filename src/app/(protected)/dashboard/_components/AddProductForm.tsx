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
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const AddProductForm = () => {
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
  const onSubmit = (values: createProductType) => {
    console.log(values);
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
        {/* <FormField
      control={form.control}
      name={"image"}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md font-semibold">Product Image</FormLabel>
          <FormControl>
            <Input placeholder={`Enter the ${label}`} {...field} type={"file"} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}
        <Button
          className="w-full bg-green-500 my-3 p-2 hover:bg-green-600"
          type="submit"
        >
          Add product
        </Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
