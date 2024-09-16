import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrderDetails } from "@/data-access/order.persistance";
import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { getUserById } from "@/data-access/user.persistance";
import Image from "next/image";
import OrderDownloadButton from "../../_components/OrderDownloadButton";
interface OrderPagePropsType {
  params: {
    id: string;
  };
}
const Order = async ({ params }: OrderPagePropsType) => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }

  const userById = await getUserById(user.id);
  const { order } = await getOrderDetails(params.id);
  if (!order) {
    notFound();
  }
  return (
    <div className="w-[90%] container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <OrderDownloadButton />
      </div>
      <div id="downloadable-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Order ID:</strong> {order[0].orders.id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {order[0].orders.orderDate?.toLocaleDateString() || ""}
              </p>
              <div>
                <strong>Status:</strong> <Badge>{order[0].orders.status}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Name:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {userById.email}
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Image</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.map((item) => (
                  <TableRow key={item.order_items.id}>
                    <TableCell>{item.products.name}</TableCell>
                    <TableCell>{item.order_items.quantity}</TableCell>
                    <TableCell>₹{item.products.price}</TableCell>
                    <TableCell>
                      ₹
                      {item.order_items.quantity *
                        parseInt(item.products.price)}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={item.products.productImage}
                        alt={item.products.name}
                        height={60}
                        width={60}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-right mt-4">
              <p className="font-bold">Total: ₹{order[0].orders.totalAmount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Order;
