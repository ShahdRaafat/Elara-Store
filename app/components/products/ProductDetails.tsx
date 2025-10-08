import { Product, ProductVariants } from "@/app/types/product";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductControls from "./ProductControls";

interface ProductDetailsProps {
  product: Product;
  productVariants: ProductVariants[];
}
function ProductDetails({ product, productVariants }: ProductDetailsProps) {
  return (
    <div>
      <Link
        href="/products"
        className="mb-6 flex items-center font-semibold text-sm text-brand-500"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2  justify-items-center gap-12 px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-lg aspect-square bg-white w-full md:w-[70%] lg:w-[90%] ">
          <Image
            src={product.image_url}
            alt={`Image of ${product.name}`}
            fill
            className="object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-xl font-bold text-brand-500 mb-6">
            LE {product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <ProductControls
            product={product}
            productVariants={productVariants}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
