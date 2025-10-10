import { getProduct, getProductVariants } from "@/app/_lib/data-services";
import ProductDetails from "@/app/components/products/ProductDetails";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}
async function page({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  const productVariants = await getProductVariants(productId);

  return <ProductDetails product={product} productVariants={productVariants} />;
}

export default page;
