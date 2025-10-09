import { Product } from "./product";

export interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
}
export interface WishlistContextProviderProps {
  children: React.ReactNode;
}
