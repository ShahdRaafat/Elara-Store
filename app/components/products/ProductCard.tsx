import { Product } from "@/app/types/product";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import WishlistButton from "./WishlistButton";
// import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}
function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block h-full group">
      <Card className="bg-white rounded-xl transition-transform duration-300 group-hover:-translate-y-1 h-full">
        <div className="relative  w-full max-w-full h-90 group-hover:scale-105 transition-transform duration-300 ">
          <Image
            src={product.image_url}
            className="object-contain p-6"
            alt={`${product.name}`}
            fill
          />
        </div>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription className="text-brand-500 font-bold">
            {product.category}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center mt-auto ">
          <p>LE {product.price.toFixed(2)}</p>
          <WishlistButton product={product} />
        </CardContent>
        <CardAction>
          {product.has_variants ? (
            <Button className=" rounded-lg w-full " size="lg">
              Choose Options
            </Button>
          ) : (
            <AddToCartButton product={product} quantity={1} />
          )}
        </CardAction>
      </Card>
    </Link>
  );
}

export default ProductCard;
