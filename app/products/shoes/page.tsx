import ProductsPage from "@/app/components/products/ProductsPage";

function Page({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; sortBy?: string; search?: string }>;
}) {
  return (
    <ProductsPage searchParams={searchParams} category="Shoes" title="Shoes" />
  );
}

export default Page;
