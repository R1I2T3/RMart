"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A bar chart showing sales made per day";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface ProductSaleByDayProps {
  data: {
    orderDate: string;
    totalPrice: string;
  }[];
}
const ProductSaleByDay = ({ data }: ProductSaleByDayProps) => {
  console.log(data);

  return (
    <Card className="lg:w-[50%] m-auto">
      <CardHeader>
        <CardTitle>Sales made per day</CardTitle>
        <CardDescription hidden>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="orderDate"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="totalPrice" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total sales made per day
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductSaleByDay;
