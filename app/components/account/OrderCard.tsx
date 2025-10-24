"use client";

import { useState } from "react";
import { Order } from "@/app/types/order";
import {
  Package,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import OrderDetails from "./OrderDetails";

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      processing:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      shipped:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      delivered:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    };
    return colors[status as keyof typeof colors] || colors.processing;
  };

  const getPaymentColor = (status: string) => {
    return status === "paid"
      ? "text-green-600 dark:text-green-400"
      : "text-yellow-600 dark:text-yellow-400";
  };

  return (
    <div className="transition-colors duration-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-8 py-6 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors duration-200 text-left"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-brand-500 flex-shrink-0" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Order #{order.id}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className={getPaymentColor(order.payment_status)}>
                  {order.payment_status}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {order.total} EGP
              </p>
              {order?.order_items && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {order?.order_items.length}{" "}
                  {order?.order_items.length === 1 ? "item" : "items"}
                </p>
              )}
            </div>
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && <OrderDetails order={order} />}
    </div>
  );
}
export default OrderCard;
