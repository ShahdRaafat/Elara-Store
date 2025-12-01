import ProductsPage from "@/app/components/products/ProductsPage";

function Page({
  searchParams,
}: {
  searchParams?: { page?: string; sortBy?: string };
}) {
  return (
    <ProductsPage searchParams={searchParams} category="Bags" title="Bags" />
  );
}

export default Page;
