import { getProducts } from "@/app/_lib/actions";
import ProductCard from "@/app/components/admin/AllProducts/ProductCard";
import { ProductsTable } from "@/app/components/admin/AllProducts/ProductsTable";
import Pagination from "@/app/components/Pagination";
import ProductsOperations from "@/app/components/products/ProductsOperations";

async function page({
  searchParams,
}: {
  searchParams?: { page?: string; sortBy?: string };
}) {
  const currentPage = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const sortBy = searchParams?.sortBy || "created_at-desc";

  const { products, totalPages } = await getProducts({
    withVariants: true,
    pageSize: 8,
    page: currentPage,
    sortBy,
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 ">
            All Products
          </h1>
          <p className="mb-6 text-gray-500">
            Browse all products available in the store.
          </p>
        </div>
        <ProductsOperations />
      </div>

      {/* Desktop table view */}
      <ProductsTable products={products} />
      {/* Mobile card view */}
      <ProductCard products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default page;
