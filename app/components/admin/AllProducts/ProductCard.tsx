import { Product } from "@/app/types/product";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import ProductActions from "./ProductActions";

function ProductCard({ products }: { products: Product[] }) {
  return (
    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">
                  {product.name}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-800 text-xs"
                  >
                    {product.category}
                  </Badge>
                  <Badge
                    variant={product.has_variants ? "default" : "outline"}
                    className={`text-xs ${
                      product.has_variants
                        ? "text-white"
                        : "border-gray-200 text-gray-700"
                    }`}
                    style={
                      product.has_variants
                        ? { backgroundColor: "var(--color-brand-500)" }
                        : {}
                    }
                  >
                    {product.has_variants ? "Variants" : "No Variants"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-600">Stock</p>
                <p className="font-semibold text-gray-900">{product.stock}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Created</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {product.created_at
                    ? new Date(product.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "-"}
                </p>
              </div>
            </div>

            <ProductActions product={product} />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default ProductCard;
