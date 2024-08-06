"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import OTP from "@/components/FormControl/otp";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyOtpSchema, verifyOtpType } from "@/lib/zod/auth";
import { ForgotPasswordVerifyEmailAction } from "../action";
import { useAction } from "next-safe-action/hooks";
const VerifyAccount = () => {
  const searchParam = useSearchParams();
  const { execute, isExecuting, result } = useAction(
    ForgotPasswordVerifyEmailAction
  );
  console.log(searchParam.get("username"));

  const form = useForm<verifyOtpType>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (values: verifyOtpType) => {
    await execute({
      username: searchParam.get("username") || "",
      pin: values.pin,
    });
    if (result.data?.error) {
      toast.error(result.data?.error);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <OTP />
        </FormProvider>
        <Button
          className="bg-green-500  hover:bg-green-600 dark:bg-green-600 w-full text-white text-xl disabled:bg-green-800"
          disabled={isExecuting}
        >
          {isExecuting ? "Verifying account" : "Verify account"}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyAccount;
