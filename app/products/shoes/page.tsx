import ProductsPage from "@/app/components/products/ProductsPage";

function page({
  searchParams,
}: {
  searchParams?: { page?: string; sortBy?: string };
}) {
  return (
    <ProductsPage searchParams={searchParams} category="Shoes" title="Shoes" />
  );
}

export default page;
