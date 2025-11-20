import { getProducts } from "@/app/_lib/data-services";
import { ProductsTable } from "@/app/components/admin/AllProducts/ProductsTable";

async function page() {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 ">
        All Products
      </h1>
      <p className="mb-6 text-gray-500">
        Browse all products available in the store.
      </p>
      <ProductsTable products={products} />
    </div>
  );
}

export default page;
