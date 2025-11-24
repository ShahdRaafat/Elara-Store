"use client";

import { Product } from "@/app/types/product";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ProductViewModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
}) {
  if (!open) return null;

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative animate-in fade-in zoom-in overflow-x-hidden h-[90%] overflow-y-scroll">
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h2>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Badge>{product.category}</Badge>

            <Badge
              variant={product.has_variants ? "default" : "outline"}
              className={
                product.has_variants
                  ? "bg-brand-500 text-white"
                  : "text-gray-700 border-gray-300"
              }
            >
              {product.has_variants ? "Has Variants" : "No Variants"}
            </Badge>

            <Badge className="bg-gray-100 text-gray-800">
              Stock: {product.stock}
            </Badge>

            <p>Price: ${product.price.toFixed(2)}</p>
          </div>

          {product.has_variants && product.product_variants && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Variants
              </h3>

              <div className="space-y-2 grid grid-cols-2 gap-3 ">
                {product.product_variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
                  >
                    <span className="font-medium text-gray-700">
                      Size: {variant.size}
                    </span>

                    <span className="text-gray-600">
                      Stock: {variant.stock}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 text-sm text-gray-500">
            Created:{" "}
            {product.created_at
              ? new Date(product.created_at).toLocaleDateString()
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
