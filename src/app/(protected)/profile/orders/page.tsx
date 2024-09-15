import React from "react";
import { getUserOrders } from "@/data-access/order.persistance";
import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const OrdersPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }
  const orders = await getUserOrders(user.id);
  return (
    <div className="container mx-auto p-6  min-h-[80vh]">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Package className="mr-2" /> Orders Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-24">
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-3xl font-bold">{orders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-24">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold">
                  ₹
                  {orders
                    .reduce(
                      (sum, order) => sum + parseInt(order.totalAmount, 10),
                      0
                    )
                    .toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-24">
                <p className="text-sm text-gray-500">Avg. Order Value</p>
                <p className="text-3xl font-bold">
                  ₹
                  {(
                    orders.reduce(
                      (sum, order) => sum + parseInt(order.totalAmount, 10),
                      0
                    ) / orders.length
                  ).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>
          <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead>View Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    {order.orderDate?.toLocaleDateString() || ""}
                  </TableCell>
                  <TableCell>
                    <Badge className={`px-2 py-1 rounded-full text-xs`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      className="flex flex-col items-center"
                      href={`/profile/orders/${order.id}`}
                    >
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{order.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
