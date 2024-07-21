"use client";

import React from "react";
import InputFormControl from "@/components/FormControl/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SocialAuthFooter from "@/components/SocialAuthFooter";
import Link from "next/link";
const LoginForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="w-full space-y-4">
        <FormProvider {...form}>
          <InputFormControl label="Email" name="email" />
          <InputFormControl label="Username" name="username" />
          <InputFormControl label="Password" name="password" />
          <div className="flex justify-end">
            <Link
              href={"/auth/login"}
              className="w-full text-sm hover:text-green-500 hover:underline underline-offset-2 text-right"
            >
              {"Login to account"}
            </Link>
          </div>

          <Button className="bg-green-500  hover:bg-green-600 dark:bg-green-600 w-full text-white text-xl">
            Signup
          </Button>
          <SocialAuthFooter />
        </FormProvider>
      </form>
    </Form>
  );
};

export default LoginForm;