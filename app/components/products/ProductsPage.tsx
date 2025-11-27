import ProductsList from "@/app/components/products/ProductsList";
import ProductsOperations from "./ProductsOperations";

interface ProductsPageProps {
  searchParams?: { page?: string; sortBy?: string; search?: string };
  category: string;
  title: string;
}
export default async function ProductsPage({
  searchParams,
  category,
  title,
}: ProductsPageProps) {
  const resolvedSeachParams = await searchParams;

  const searchQuery = resolvedSeachParams?.search;

  const currentPage = resolvedSeachParams?.page
    ? parseInt(resolvedSeachParams.page)
    : 1;

  const sortBy = resolvedSeachParams?.sortBy || "created_at-desc";

  return (
    <>
      <h2 className=" text-brand-500  py-4 text-xl md:text-2xl font-semibold text-center">
        {title}
      </h2>
      <ProductsOperations />
      <ProductsList
        category={category}
        sortBy={sortBy}
        currentPage={currentPage}
        searchQuery={searchQuery}
      />
    </>
  );
}
