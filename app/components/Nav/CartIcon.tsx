"use client";

import { ShoppingCart } from "lucide-react";
// import { useCart } from "@/app/_contexts/CartContext";

function CartIcon() {
  // const { getTotalItems } = useCart();
  // const totalItems = getTotalItems();

  return <ShoppingCart className="size-4.5" />;
}

export default CartIcon;
{
  /* {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )} */
}
