"use client";

import { useCart } from "@/app/_contexts/CartContext";
import CartItem from "./CartItem";
import Heading from "../Heading";

function CartList() {
  const { cart, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  return (
    <div className=" lg:col-span-4 ">
      {totalItems > 0 ? (
        <div className=" bg-white rounded-2xl ">
          <Heading>Cart Items {`(${totalItems})`}</Heading>
          <div className="px-4 py-3">
            {cart.map((item) => (
              <CartItem item={item} key={`${item.id}-${item.size}`} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-800 text-xl absolute top-[50%] left-[50%] -translate-x-2/4">
          Your cart is empty.
        </p>
      )}
    </div>
  );
}

export default CartList;
