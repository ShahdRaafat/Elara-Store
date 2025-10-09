"use client";
import { createContext, useContext } from "react";

import {
  CartContextProviderProps,
  CartContextType,
  CartItemType,
} from "../types/cart";
import { Product } from "../types/product";
import { useLocalStorage } from "../_hooks/useLocalStorage";

type Cart = CartItemType[];
const CartContext = createContext<undefined | CartContextType>(undefined);

function CartProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useLocalStorage<Cart>("cart", []);

  function addToCart(
    product: Product,
    quantity: number = 1,
    size?: string | null
  ) {
    const exists = cart.find(
      (item) => product.id === item.id && size === item.size
    );
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        { ...product, quantity, size: size ?? undefined },
      ]);
    }
  }

  function deleteFromCart(productId: string, size?: string) {
    setCart(
      cart.filter((item) => !(item.id === productId && item.size === size))
    );
  }

  function increaseQuantity(productId: string, size?: string) {
    setCart(
      cart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId: string, size?: string) {
    setCart(
      cart
        .map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function getTotalItems() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    return totalItems;
  }
  function getTotalPrice() {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    return totalPrice;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { CartProvider, useCart };
