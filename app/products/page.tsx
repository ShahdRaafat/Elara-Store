import ProductsPage from "../components/products/ProductsPage";

function Page({
  searchParams,
}: {
  searchParams?: { page?: string; sortBy?: string };
}) {
  return (
    <ProductsPage
      searchParams={searchParams}
      category="all"
      title="All Products"
    />
  );
}

export default Page;
