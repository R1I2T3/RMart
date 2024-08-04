"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import OTP from "@/components/FormControl/otp";
import { toast } from "sonner";
import { verifyOtpSchema, verifyOtpType } from "@/lib/zod/auth";
import { useAction } from "next-safe-action/hooks";
import { verifyAccountAction } from "./action";
const VerifyAccount = ({ username }: { username: string }) => {
  const form = useForm<verifyOtpType>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      pin: "",
    },
  });
  const { result, execute, isExecuting } = useAction(verifyAccountAction);
  const onSubmit = async (values: verifyOtpType) => {
    await execute({ pin: values.pin, username: username });
    if (result.data?.error) {
      toast.error(result.data.error);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <OTP />
        </FormProvider>
        <Button
          className="bg-green-500  hover:bg-green-600 dark:bg-green-600 w-full text-white text-xl"
          disabled={isExecuting}
        >
          {isExecuting ? "Verifying account" : "Verify account"}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyAccount;
