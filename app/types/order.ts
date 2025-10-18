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
export interface Order {
  user_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  governorate: string;
  postal_code?: string;
  payment_method: "cash" | "card";
  total: number;
  status: string;
  payment_status: "pending" | "paid";
  stripe_session_id?: string;
}
