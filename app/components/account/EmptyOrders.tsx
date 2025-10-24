import { Package } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="p-12 text-center">
      <Package className="w-16 h-16 text-gray-300 dark:text-zinc-700 mx-auto mb-4" />
      <p className="text-gray-500 dark:text-gray-400 text-lg">No orders yet</p>
      <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
        Start shopping to see your orders here
      </p>
    </div>
  );
}
