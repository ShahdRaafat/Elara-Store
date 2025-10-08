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

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
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
