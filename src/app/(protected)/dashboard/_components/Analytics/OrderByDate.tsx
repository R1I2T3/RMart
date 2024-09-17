"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
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
export const description = "A line chart with a label";

interface OrderByDateProps {
  data: {
    orderDate: string;
    count: number;
  }[];
}
const chartConfig = {
  desktop: {
    label: "count",
    color: "hsl(var(--chart-1))",
  },
};
const OrderByDate = ({ data }: OrderByDateProps) => {
  return (
    <Card className="lg:w-[40%]">
      <CardHeader>
        <CardTitle>Product sell per day</CardTitle>
        <CardDescription hidden>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="orderDate"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total product sell by date
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderByDate;
