"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { OrderProductCategoryChartConfig } from "./OrderProductCategoryChartConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A Pie chart showing data according to categories";

interface OrderProductCategoryChartProps {
  data: {
    categoryName: string;
    count: number;
  }[];
}
export function OrderProductCategoryChart({
  data,
}: OrderProductCategoryChartProps) {
  const totalProductSell = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, []);
  data = data.map((item) => ({
    ...item,
    fill: `var(--color-${item.categoryName})`,
  }));
  return (
    <Card className="flex flex-col lg:w-[40%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product selling by category</CardTitle>
        <CardDescription hidden={true}>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={OrderProductCategoryChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="categoryName"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProductSell}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total product sell by category
        </div>
      </CardFooter>
    </Card>
  );
}
