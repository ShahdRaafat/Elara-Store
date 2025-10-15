import ProductsList from "@/app/components/products/ProductsList";
import ProductsOperations from "../components/products/ProductsOperations";

interface ProductsPageProps {
  searchParams?: { sortBy?: string };
}
export default async function Home({ searchParams }: ProductsPageProps) {
  const resolvedSeachParams = await searchParams;
  const sortBy = resolvedSeachParams?.sortBy || "created_at-desc";
  return (
    <>
      <h2 className=" text-brand-500  py-4 text-xl md:text-2xl font-semibold text-center">
        Products
      </h2>
      <ProductsOperations />
      <ProductsList category="all" sortBy={sortBy} />
    </>
  );
}
