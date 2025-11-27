import { getProducts } from "@/app/_lib/data-services";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types/product";
import Pagination from "../Pagination";

interface ProductsListProps {
  category: string;
  sortBy?: string;
  currentPage?: number;
}
async function ProductsList({
  category,
  sortBy,
  currentPage,
}: ProductsListProps) {
  const { products, totalPages } =
    category === "all"
      ? await getProducts({ sortBy, page: currentPage })
      : await getProducts({ category, sortBy, page: currentPage });

  return (
    <div className="space-y-3">
      <div
        className="px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 md:gap-y-8 lg:gap-y-10 sm:gap-x-5 md:gap-x-8 auto-rows-fr
 "
      >
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination currentPage={currentPage || 1} totalPages={totalPages} />
    </div>
  );
}

export default ProductsList;
