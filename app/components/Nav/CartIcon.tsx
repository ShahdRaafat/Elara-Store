"use client";

import { useCart } from "@/app/_contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

function CartIcon() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <>
      <ShoppingCart className="size-4.5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </>
  );
}

export default CartIcon;
