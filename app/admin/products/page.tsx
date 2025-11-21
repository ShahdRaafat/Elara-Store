import { getProductsWithVariants } from "@/app/_lib/data-services";
import ProductCard from "@/app/components/admin/AllProducts/ProductCard";
import { ProductsTable } from "@/app/components/admin/AllProducts/ProductsTable";

async function page() {
  const products = await getProductsWithVariants();
  return (
    <div>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 ">
        All Products
      </h1>
      <p className="mb-6 text-gray-500">
        Browse all products available in the store.
      </p>

      {/* Desktop table view */}
      <ProductsTable products={products} />
      {/* Mobile card view */}
      <ProductCard products={products} />
    </div>
  );
}

export default page;
