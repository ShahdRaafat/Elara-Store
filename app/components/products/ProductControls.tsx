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

  const mustChooseSize = product.has_variants && !selectedSize;

  function renderStockMessage() {
    if (product.has_variants && !selectedSize) return null;
    if (maxStock === 0)
      return <p className="text-red-500 font-medium">Out of stock</p>;
    if (maxStock <= 5)
      return (
        <p className="text-yellow-600 font-medium">
          Only {maxStock} left in stock!
        </p>
      );
    return <p className="text-green-600 font-medium">In stock</p>;
  }

  return (
    <div>
      {/* Size */}
      {product.has_variants && (
        <div className="my-6 flex flex-col gap-4">
          <span className="font-bold">Size</span>
          <div className="flex gap-3 flex-wrap">
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
      )}
      {/* stock message */}
      <div className="mt-2">{renderStockMessage()}</div>
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
          disabled={product.has_variants && !selectedSize}
        />
        <Button variant="outline">
          <HeartIcon />
        </Button>
      </div>

      {mustChooseSize && (
        <p className="text-sm text-gray-800 mt-3 font-medium">
          Please select a size before adding to cart.
        </p>
      )}
    </div>
  );
}

export default ProductControls;
