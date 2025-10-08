import { Product } from "./product";

export interface CartItemType extends Product {
  quantity: number;
  size?: string;
}

export interface CartContextType {
  cart: CartItemType[];
  addToCart: (product: Product, quantity: number, size?: string) => void;
  // deleteFromCart: (productId: number) => void;
  // increaseQuantity: (productId: number) => void;
  // decreaseQuantity: (productId: number) => void;
  // getTotalItems: () => number;
  // getTotalPrice: () => number;
}

export interface CartContextProviderProps {
  children: React.ReactNode;
}
