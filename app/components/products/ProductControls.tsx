"use client";
import { Product, ProductVariants } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { HeartIcon, Minus, Plus } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

interface ProductControlsProps {
  product: Product;
  productVariants: ProductVariants[];
}

function ProductControls({ product, productVariants }: ProductControlsProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);
  const maxStock =
    productVariants.length > 0
      ? productVariants.find((v) => v.size === selectedSize)?.stock || 0
      : product.stock || 0;

  return (
    <div>
      {/* Size */}
      <div className="my-6 flex flex-col gap-4">
        <span className="font-bold">Size</span>
        <div className="flex gap-3">
          {productVariants.map((v) => (
            <Button
              variant={selectedSize === v.size ? "default" : "outline"}
              key={v.id}
              onClick={() => setSelectedSize(v.size)}
            >
              {v.size}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className=" mt-8 mb-6 flex flex-col gap-4">
        <span className="font-bold">Quantity</span>
        <div className="flex items-center flex-1  ">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Minus />
          </Button>
          <span className="px-3 font-bold">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity((q) => (q < maxStock ? q + 1 : q))}
          >
            <Plus />
          </Button>
        </div>
      </div>

      {/* Add to cart */}
      <div className="flex gap-4 mt-12">
        <AddToCartButton
          product={product}
          quantity={quantity}
          size={selectedSize}
        />
        <Button variant="outline">
          <HeartIcon />
        </Button>
      </div>
    </div>
  );
}

export default ProductControls;
