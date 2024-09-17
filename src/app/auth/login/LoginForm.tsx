"use client";

import React from "react";
import InputFormControl from "@/components/FormControl/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SocialAuthFooter from "@/components/SocialAuthFooter";
import Link from "next/link";
import { LoginAction } from "./action";
import { useAction } from "next-safe-action/hooks";
import { LoginSchema, LoginType } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
const LoginForm = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { execute, isExecuting, result } = useAction(LoginAction);
  const onSubmit = async (values: LoginType) => {
    execute(values);
    if (result.data?.error) {
      toast.error(result.data.error);
    }
  };
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <InputFormControl label="Email" name="email" />
          <InputFormControl label="Password" name="password" type="password" />
          <div className="flex justify-between items-center">
            <Link
              href={"/auth/forgot_password"}
              className="text-sm hover:text-blue-500 hover:underline underline-offset-2"
            >
              {"Forgot password"}
            </Link>
            <Link
              href={"/auth/signup"}
              className="text-sm hover:text-blue-500 hover:underline underline-offset-2"
            >
              {"Create a account"}
            </Link>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 w-full text-white text-xl">
            {isExecuting ? "Login..." : "Login"}
          </Button>
          <SocialAuthFooter />
        </FormProvider>
      </form>
    </Form>
  );
};

export default LoginForm;
