import { Order } from "@/app/types/order";
import { Package } from "lucide-react";
import OrderItemRow from "./OrderItemRow";

interface OrderDetailsProps {
  order: Order;
}
function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-gray-50 dark:bg-zinc-800/30">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-zinc-700">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500" />
          Order Items
        </h3>

        {order.order_items && order.order_items.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {order.order_items.map((item) => (
              <OrderItemRow key={item.id} item={item} />
            ))}

            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t-2 border-gray-200 dark:border-zinc-700">
              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Total
                </span>
                <span className="text-lg sm:text-xl font-bold text-brand-600 dark:text-brand-400">
                  {order.total} EGP
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
            No items found
          </p>
        )}
      </div>
    </div>
  );
}
export default OrderDetails;
