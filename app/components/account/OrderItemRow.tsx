import { OrderItem } from "@/app/types/order";
import Image from "next/image";

interface OrderItemRowProps {
  item: OrderItem;
}

export default function OrderItemRow({ item }: OrderItemRowProps) {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-zinc-800 last:border-0 last:pb-0">
      {item.products?.image_url && (
        <div className="relative w-16 h-16">
          <Image
            src={item.products?.image_url || "/placeholder.png"}
            alt={item.products?.name}
            className="absolute rounded-md object-contain"
            fill
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {item.products?.name || "Product"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Quantity: {item.quantity}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {item.price} EGP
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">each</p>
      </div>
    </div>
  );
}
