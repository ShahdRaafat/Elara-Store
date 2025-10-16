import { Product } from "./product";

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  quantity: number;
  size?: string;
  has_variants: boolean;
}

export interface CartContextType {
  cart: CartItemType[];
  addToCart: (product: Product, quantity: number, size?: string) => void;
  deleteFromCart: (productId: string, size?: string) => void;
  increaseQuantity: (productId: string, size?: string) => void;
  decreaseQuantity: (productId: string, size?: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export interface CartContextProviderProps {
  children: React.ReactNode;
}
