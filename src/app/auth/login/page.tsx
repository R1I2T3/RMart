import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <Card className="w-[90%] md:w-[70%] lg:w-[50%]">
      <CardHeader>
        <CardTitle className="m-auto text-2xl md:text-3xl lg:text-4xl text-green-500 dark:text-green-600">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <LoginForm />
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
