import { getProducts, getProductsByCategory } from "@/app/_lib/data-services";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types/product";

interface ProductsListProps {
  category: string;
}
async function ProductsList({ category }: ProductsListProps) {
  const products =
    category === "all"
      ? await getProducts()
      : await getProductsByCategory(category);

  return (
    <div
      className="px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 md:gap-y-8 lg:gap-y-10 sm:gap-x-5 md:gap-x-8 auto-rows-fr
 "
    >
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
