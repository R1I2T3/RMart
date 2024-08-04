import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifyAccount from "./Verify_account";

interface VerifyAccountPageProps {
  searchParams: {
    username: string;
  };
}
const VerifyAccountPage = ({ searchParams }: VerifyAccountPageProps) => {
  return (
    <Card className="w-[90%] md:w-[50%] lg:w-[40%]">
      <CardHeader>
        <CardTitle className="m-auto text-2xl md:text-3xl lg:text-4xl text-green-500 dark:text-green-600">
          Verify Email
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <VerifyAccount username={searchParams.username} />
      </CardFooter>
    </Card>
  );
};

export default VerifyAccountPage;
