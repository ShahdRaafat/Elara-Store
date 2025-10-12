import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/app/_contexts/WishlistContext";
import { useCart } from "@/app/_contexts/CartContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/app/types/product";

function WishlistCard({ item }: { item: Product }) {
  const { toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isAvailable = item.stock && item.stock > 0;

  function handleAddToCart() {
    if (item.has_variants)
      return (window.location.href = `/products/${item.id}`);
    addToCart(item, 1);
    toast.success("Added to cart 🛒");
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleWishlist(item)}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>

          <Link
            href={`/products/${item.id}`}
            className="flex items-center gap-3"
          >
            <div className="relative w-14 h-14 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <span className="font-medium text-gray-800">{item.name}</span>
          </Link>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Price:</span>
        <span className="font-medium text-gray-900">LE {item.price}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Status:</span>
        <span
          className={`font-medium ${
            isAvailable ? "text-green-600" : "text-red-500"
          }`}
        >
          {isAvailable ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <Button
        size="sm"
        disabled={!isAvailable}
        onClick={handleAddToCart}
        className={`w-full mt-2 ${
          isAvailable
            ? "bg-[#8c1c13] hover:bg-[#70160f] text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Add to Cart
      </Button>
    </div>
  );
}
export default WishlistCard;
