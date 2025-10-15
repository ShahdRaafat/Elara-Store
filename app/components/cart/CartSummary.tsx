"use client";

import { useCart } from "@/app/_contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Heading from "../Heading";
import Link from "next/link";

const SHIPPING_COST = 70;
function CartSummary() {
  const { getTotalItems, getTotalPrice } = useCart();

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();

  const total = subtotal + SHIPPING_COST;

  return (
    <div className="col-span-2">
      {totalItems > 0 ? (
        <Card className="h-fit p-0 pb-4  bg-gray-50 rounded-lg shadow-md">
          <CardHeader className="p-0">
            <Heading>Order Summary</Heading>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Items ({totalItems})</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>{SHIPPING_COST.toFixed(2)}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-semibold text-lg text-gray-900">
              <span>Total</span>
              <span>{total.toFixed(2)}</span>
            </div>
          </CardContent>

          <CardFooter>
            <Link href="/checkout" className="w-full">
              <Button className="rounded-lg w-full ">Checkout</Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}

export default CartSummary;
