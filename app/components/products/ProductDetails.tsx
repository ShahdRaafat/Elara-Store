import { Product, ProductVariants } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HeartIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

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

          <div className="my-6 flex flex-col gap-4">
            <span className="font-bold">Size</span>
            <div className="flex gap-3">
              {productVariants.map((v) => (
                <Button variant="outline" key={v.id}>
                  {v.size}
                </Button>
              ))}
            </div>
          </div>

          <div className=" mt-8 mb-6 flex flex-col gap-4">
            <span className="font-bold">Quantity</span>
            <div className="flex items-center flex-1  ">
              <Button variant="outline" size="icon">
                <Minus />
              </Button>
              <span className="px-3 font-bold">1</span>
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </div>
          </div>
          <div className="flex gap-4 mt-12">
            <AddToCartButton product={product} />
            <Button variant="outline">
              <HeartIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
