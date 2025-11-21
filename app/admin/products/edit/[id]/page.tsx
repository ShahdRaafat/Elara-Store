import { getProduct, getProductVariants } from "@/app/_lib/data-services";
import ProductForm from "@/app/components/admin/NewProduct/ProductForm";
import { get } from "http";

async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await getProduct(id);
  const productVariants = await getProductVariants(id);

  const initialValues = {
    name: product.name,
    price: product.price,
    description: product.description,
    image_url: product.image_url,
    category: product.category,
    stock: product?.stock,
    hasVariants: product.has_variants,
    variants: productVariants.map((variant) => ({
      size: variant.size,
      stock: variant.stock,
    })),
  };

  return (
    <div>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
        Edit Product: {product.name}
      </h1>

      <ProductForm mode="edit" productId={id} initialValues={initialValues} />
    </div>
  );
}

export default page;
