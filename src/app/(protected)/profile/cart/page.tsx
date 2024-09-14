import { getCartItems } from "@/data-access/cart.persistance";
import React, { use } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CartItem from "./CartItem";
import { validateRequest } from "@/lib/auth/VerifyUserisAuthenticatedOrNot";
import { redirect } from "next/navigation";
const CartPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }
  const cartItems = await getCartItems(user.id);
  const TotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="w-[90%] mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">Your Cart</CardTitle>
            <Badge variant="secondary" className="text-lg py-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {cartItems.length} items
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">
                Your cart is empty.
              </p>
              <Button>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <React.Fragment key={item.cartItemsId}>
                  <CartItem item={item} />
                  <Separator />
                </React.Fragment>
              ))}
            </div>
          )}
        </CardContent>
        {cartItems.length > 0 && (
          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <div className="w-full flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">{TotalPrice}</span>
            </div>
            <Button className="w-full mt-4 bg-blue-600" size="lg">
              Proceed to Checkout
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default CartPage;
