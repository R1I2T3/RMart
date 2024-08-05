import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ForgotPasswordContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Card className="w-[90%] md:w-[70%] lg:w-[50%]">
      <CardHeader>
        <CardTitle className="m-auto text-2xl md:text-3xl lg:text-4xl text-green-500 dark:text-green-600">
          Forgot password
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ForgotPasswordContainer;