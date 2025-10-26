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
        className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors duration-200 text-left"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                Order #{order.id.slice(0, 8)}
              </span>
              <span
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-x-6 sm:gap-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className={getPaymentColor(order.payment_status)}>
                  {order.payment_status}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            <div className="text-left sm:text-right">
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                {order.total} EGP
              </p>
              {order?.order_items && (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {order?.order_items.length}{" "}
                  {order?.order_items.length === 1 ? "item" : "items"}
                </p>
              )}
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && <OrderDetails order={order} />}
    </div>
  );
}
export default OrderCard;
