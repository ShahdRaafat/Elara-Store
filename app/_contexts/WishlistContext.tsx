"use client";
import { createContext, useContext } from "react";
import { Product } from "@/app/types/product";
import { useLocalStorage } from "../_hooks/useLocalStorage";
import {
  WishlistContextProviderProps,
  WishlistContextType,
} from "../types/wishlist";

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: WishlistContextProviderProps) {
  const [wishlist, setWishlist] = useLocalStorage<Product[]>("wishlist", []);

  function toggleWishlist(product: Product) {
    const exists = wishlist.find((p) => p.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((p) => p.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  }

  function isInWishlist(id: string) {
    return wishlist.some((p) => p.id === id);
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used inside a WishlistProvider");
  return context;
}
