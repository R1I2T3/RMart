import { ChartConfig } from "@/components/ui/chart";
export const OrderProductCategoryChartConfig = {
  Smartphones: {
    label: "Smartphones",
    color: "hsl(var(--chart-1))",
  },
  Laptops: {
    label: "Laptops",
  },
  Tablets: {
    label: "Tablets",
    color: "hsl(var(--chart-2))",
  },
  "Desktop Computers": {
    label: "Desktop Computers",
    color: "hsl(var(--chart-3))",
  },
  Smartwatches: {
    label: "Smartwatches",
    color: "hsl(var(--chart-4))",
  },
  Televisions: {
    label: "Televisions",
    color: "hsl(var(--chart-5))",
  },
  "Home Audio Systems": {
    label: "Home Audio Systems",
    color: "hsl(var(--chart-6))",
  },
  "Gaming Consoles": {
    label: "Gaming Consoles",
    color: "hsl(var(--chart-5))",
  },
  "Digital Cameras": {
    label: "Digital Cameras",
    color: "hsl(var(--accent-foreground))",
  },
} satisfies ChartConfig;
