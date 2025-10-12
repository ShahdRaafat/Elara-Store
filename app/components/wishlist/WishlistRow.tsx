import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/app/_contexts/WishlistContext";
import { useCart } from "@/app/_contexts/CartContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/app/types/product";

function WishlistRow({ item }: { item: Product }) {
  const { toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  function handleAddToCart() {
    if (item.has_variants)
      return (window.location.href = `/products/${item.id}`);
    addToCart(item, 1);
    toast.success("Added to cart 🛒");
  }

  const isAvailable = item.stock && item.stock > 0;

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4 flex items-center gap-4">
        <button
          onClick={() => toggleWishlist(item)}
          className="text-gray-400 hover:text-red-500"
        >
          <X className="w-4 h-4" />
        </button>

        <Link href={`/products/${item.id}`} className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-md bg-gray-100 overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <span className="font-medium text-gray-800">{item.name}</span>
        </Link>
      </td>

      <td className="py-4 px-4 font-medium">LE {item.price}</td>

      <td className="py-4 px-4">
        <span
          className={`font-medium ${
            isAvailable ? "text-green-600" : "text-red-500"
          }`}
        >
          {isAvailable ? "In Stock" : "Out of Stock"}
        </span>
      </td>

      <td className="py-4 px-4 text-right">
        <Button
          size="sm"
          disabled={!isAvailable}
          onClick={handleAddToCart}
          className={`${
            isAvailable
              ? "bg-[#8c1c13] hover:bg-[#70160f] text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </Button>
      </td>
    </tr>
  );
}
export default WishlistRow;
