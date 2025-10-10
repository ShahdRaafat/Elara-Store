"use client";

import { useCart } from "@/app/_contexts/CartContext";
import CartItem from "./CartItem";
import Heading from "../Heading";
import { ShoppingCart } from "lucide-react";

function CartList() {
  const { cart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="lg:col-span-4">
      {totalItems > 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <Heading>Shopping Cart ({totalItems})</Heading>
          <div className="px-4 sm:px-6 py-6">
            {cart.map((item) => (
              <CartItem item={item} key={`${item.id}-${item.size}`} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 text-center">
            Add items to your cart to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default CartList;
