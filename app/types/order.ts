import { CartItemType } from "./cart";

export interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  governorate: string;
  postalCode?: string;
  paymentMethod: "cash" | "card";
  total: number;
  cart: CartItemType[];
}
export interface OrderItem {
  id: string;
  product_id: string;
  variant_id: string;
  price: number;
  quantity: number;
  products: { name: string; image_url: string };
}
