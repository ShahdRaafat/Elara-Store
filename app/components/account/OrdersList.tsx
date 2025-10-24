import { Order } from "@/app/types/order";
import { ShoppingBag } from "lucide-react";
import EmptyOrders from "./EmptyOrders";
import OrderCard from "./OrderCard";
import SectionHeader from "../SectionHeader";

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  if (!orders?.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
        <SectionHeader
          icon={ShoppingBag}
          title="Order History"
          description="Your orders will appear here"
        />
        <EmptyOrders />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
      <SectionHeader
        icon={ShoppingBag}
        title="Order History"
        description={`${orders.length} ${
          orders.length === 1 ? "order" : "orders"
        } total`}
      />

      <div className="divide-y divide-gray-200 dark:divide-zinc-800">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
