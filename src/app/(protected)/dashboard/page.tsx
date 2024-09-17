import React from "react";
import { OrderProductCategoryChart } from "./_components/Analytics/OrderProductCategoryChart";
import { getOrderProductStatByCategory } from "./_actions/get-order-product-stat";
import { getOrderByDate } from "@/data-access/admin.persistance";
import OrderByDate from "./_components/Analytics/OrderByDate";
import { formatDate } from "@/utils";
import ProductSaleByDay from "./_components/Analytics/ProductSaleByDay";
import { salesMadePerDay } from "@/data-access/admin.persistance";
const AnalyticsPage = async () => {
  const { productDetails } = await getOrderProductStatByCategory();
  let { orderByDate: orderByDateData } = await getOrderByDate();
  let orderByDateFiltered = orderByDateData.map((item) => ({
    ...item,
    orderDate: formatDate(item.orderDate),
  }));
  orderByDateFiltered = orderByDateFiltered.reduce((acc, current) => {
    const existing = acc.find((item) => item.orderDate === current.orderDate);
    if (existing) {
      existing.count += current.count;
    } else {
      acc.push(current);
    }
    return acc;
  }, [] as { orderDate: string; count: number }[]);
  let { sales } = await salesMadePerDay();
  let salesFiltered = sales.map((item) => ({
    orderDate: formatDate(item.orderDate),
    totalPrice: item.totalPrice ?? "0", // or any default value
  }));
  salesFiltered = salesFiltered.reduce((acc, current) => {
    const existing = acc.find((item) => item.orderDate === current.orderDate);
    if (existing) {
      existing.totalPrice = (
        parseInt(current.totalPrice) + parseInt(existing.totalPrice)
      ).toString();
    } else {
      acc.push(current);
    }
    return acc;
  }, [] as { orderDate: string; totalPrice: string }[]);
  return (
    <div className="w-[85%]">
      <h1 className="text-3xl font-extrabold tracking-tighter">Analytics </h1>
      <section className="my-10 flex flex-wrap gap-10">
        <OrderProductCategoryChart data={productDetails} />
        <OrderByDate data={orderByDateFiltered} />
        <ProductSaleByDay data={salesFiltered} />
      </section>
    </div>
  );
};

export default AnalyticsPage;
