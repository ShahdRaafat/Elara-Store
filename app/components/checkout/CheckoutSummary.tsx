"use client";

import { useCart } from "@/app/_contexts/CartContext";
import Image from "next/image";
const SHIPPING_COST = 70;
export default function OrderSummary() {
  const { cart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  const grandTotal = totalPrice + SHIPPING_COST;

  return (
    <div className=" p-6 rounded-xl  h-fit">
      <h3 className="text-lg font-semibold mb-6 border-b pb-3">
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center justify-between gap-3 border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    className="absolute object-contain"
                    fill
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <div className="flex gap-4">
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.size ? `Size: ${item.size}` : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  {(item.price * item.quantity).toFixed(2)} EGP
                </p>
                <p className="text-xs text-gray-400">{item.price} each</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="space-y-2 border-t pt-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{totalPrice.toFixed(2)} EGP</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{`${SHIPPING_COST.toFixed(2)} EGP`}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Estimated Delivery</span>
          <span>2-4 business days</span>
        </div>

        <div className="flex justify-between text-gray-800 font-semibold text-base border-t pt-3 mt-2">
          <span>Total</span>
          <span>{grandTotal.toFixed(2)} EGP</span>
        </div>
      </div>
    </div>
  );
}
