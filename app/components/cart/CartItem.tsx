import { useCart } from "@/app/_contexts/CartContext";
import { CartItemType } from "@/app/types/cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import DeleteItem from "./DeleteItem";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const { deleteFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const totalPrice = item.quantity * item.price;

  return (
    <Card className="mb-4 p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Product Image */}
        <div className="relative w-full h-40 md:h-30  md:w-30 ">
          <Image
            src={item.image_url}
            className="object-contain"
            alt={item.image_url}
            fill
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.name}
              </h3>
              {item.size && (
                <span className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  Size: {item.size}
                </span>
              )}
            </div>

            {/* Delete Button - Desktop */}
            <div className="hidden sm:block">
              <DeleteItem item={item} onDelete={deleteFromCart} />
            </div>
          </div>

          {/* Price and Quantity Controls */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Controls */}

            <div className="flex items-center flex-1  ">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decreaseQuantity(item.id, item.size)}
              >
                <Minus />
              </Button>
              <span className="px-3">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => increaseQuantity(item.id, item.size)}
              >
                <Plus />
              </Button>
            </div>

            {/* Prices */}
            <div className="flex justify-between gap-6">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                <p className="text-base font-semibold text-gray-700">
                  {item.price.toFixed(2)} EGP
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Total</p>
                <p className="text-lg font-bold text-brand-500">
                  {totalPrice.toFixed(2)} EGP
                </p>
              </div>
              {/* Delete Button - Mobile */}
              <div className="sm:hidden">
                <DeleteItem item={item} onDelete={deleteFromCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;
