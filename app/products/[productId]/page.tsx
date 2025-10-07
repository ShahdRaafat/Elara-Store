import { getProduct, getProductVariants } from "@/app/_lib/data-services";
import ProductDetails from "@/app/components/products/ProductDetails";

interface ProductPageProps {
  params: {
    productId: string;
  };
}
async function page({ params }: ProductPageProps) {
  const { productId } = params;
  const product = await getProduct(productId);

  const productVariants = await getProductVariants(productId);

  return <ProductDetails product={product} productVariants={productVariants} />;
}

export default page;
