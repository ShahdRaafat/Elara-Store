"use client";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { Product } from "@/app/types/product";
import { useWishlist } from "@/app/_contexts/WishlistContext";
import toast from "react-hot-toast";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

function WishlistButton({ product, className }: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    toggleWishlist(product);
    toast.success("Product added successfully to wishlist");
  }

  return (
    <Button
      variant="outline"
      className={`bg-transparent p-3 ${className}`}
      onClick={handleClick}
    >
      <HeartIcon
        className={`h-6 w-6 transition-colors ${
          inWishlist ? "fill-brand-500 text-brand-500" : "text-gray-500"
        }`}
      />
    </Button>
  );
}

export default WishlistButton;
