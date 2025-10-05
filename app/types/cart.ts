import { Product } from "./product";

export interface CartItemType extends Product {
  quantity: number;
}

export interface Cart {
  products: CartItemType[];
}

export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product) => void;
  deleteFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface CartContextProviderProps {
  children: React.ReactNode;
}
