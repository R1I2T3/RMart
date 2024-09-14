"use client";

import React from "react";
import InputFormControl from "@/components/FormControl/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ForgotPasswordInputSchema,
  ForgotPasswordInputType,
} from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordEmailInputAction } from "../action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
const ForgotPasswordInput = () => {
  const { isExecuting, execute, result } = useAction(
    ForgotPasswordEmailInputAction
  );
  const form = useForm<ForgotPasswordInputType>({
    resolver: zodResolver(ForgotPasswordInputSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: ForgotPasswordInputType) => {
    execute(values);
    if (result.data?.error) {
      toast.error(result.data.error);
    } else {
      toast.success("Verification email code is send to your account");
    }
  };
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="Email" name="email" />
        </FormProvider>
        <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 w-full text-white text-xl">
          {isExecuting ? "Sending mail" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordInput;
