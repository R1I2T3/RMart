"use client";

import React from "react";
import InputFormControl from "@/components/FormControl/Input";
import { Form } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { NewPasswordAction } from "../action";
import { NewPasswordSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordType } from "@/lib/zod/auth";
import { toast } from "sonner";
const NewPasswordForm = () => {
  const form = useForm<NewPasswordType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });
  const { execute, result, isExecuting } = useAction(NewPasswordAction);
  const onSubmit = (values: NewPasswordType) => {
    execute(values);
    if (result.data?.error) {
      toast.error(result.data.error);
    }
    toast.success("Your password reset successfully");
  };
  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="New Password" name="new_password" />
          <InputFormControl label="Confirm Password" name="confirm_password" />
        </FormProvider>
        <Button
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 w-full text-white text-xl disabled:bg-blue-800"
          disabled={isExecuting}
        >
          {isExecuting ? "Resetting Password" : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
