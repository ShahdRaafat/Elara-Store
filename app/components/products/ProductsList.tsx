import ProductCard from "./ProductCard";
import { Product } from "@/app/types/product";
import Pagination from "../Pagination";
import { Suspense } from "react";
import { getProducts } from "@/app/_lib/actions";

interface ProductsListProps {
  category: string;
  sortBy?: string;
  currentPage?: number;
  searchQuery?: string;
}
async function ProductsList({
  category,
  sortBy,
  currentPage,
  searchQuery,
}: ProductsListProps) {
  const data =
    searchQuery && searchQuery.trim().length > 0
      ? await getProducts({
          searchQuery,
          limit: 20,
          sortBy,
          page: currentPage,
        })
      : category === "all"
      ? await getProducts({ sortBy, page: currentPage })
      : await getProducts({ category, sortBy, page: currentPage });

  const { products, totalPages } = data;

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {searchQuery
            ? `No products found for "${searchQuery}"`
            : "No products available"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Suspense>
        <div
          className="px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-6 md:gap-y-8 lg:gap-y-10 sm:gap-x-5 md:gap-x-8 auto-rows-fr
 "
        >
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>

      <Pagination currentPage={currentPage || 1} totalPages={totalPages} />
    </div>
  );
}

export default ProductsList;
