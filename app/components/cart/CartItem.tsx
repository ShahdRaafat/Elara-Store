import { useCart } from "@/app/_contexts/CartContext";
import { CartItemType } from "@/app/types/cart";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
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
    <Card className="sm:flex-row items-center justify-between gap-4 mb-5 p-4 bg-[#F4F2EE] rounded-lg">
      <div className="flex flex-col sm:flex-row flex-1 gap-4 lg:gap-5 items-center">
        <div className="relative w-full h-30 md:h-20  md:w-20 ">
          <Image
            src={item.image_url}
            className="object-contain"
            alt={item.name}
            fill
          />
        </div>
        <CardTitle className="text-gray-900 flex flex-col gap-3">
          <span>{item.name}</span>
          {item.size && <span className="ml-10">{item.size}</span>}
        </CardTitle>{" "}
      </div>
      <div className="flex-1 flex items-center ">
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

        <p className="w-20 text-center font-bold text-primary-500">
          {item.price.toFixed(2)}
        </p>
        <p className="w-20 text-center font-bold text-primary-500">
          {totalPrice.toFixed(2)}
        </p>
      </div>
      <div>
        <DeleteItem item={item} onDelete={deleteFromCart} />
      </div>
    </Card>
  );
}

export default CartItem;
