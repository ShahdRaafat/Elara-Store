import { Product } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { Edit2, Eye } from "lucide-react";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";

function ProductActions({ product }: { product: Product }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="icon"
        className=" flex-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Button
        variant="icon"
        className="flex-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Link href={`/admin/products/edit/${product.id}`}>
          <Edit2 className="h-4 w-4" />
        </Link>
      </Button>

      <DeleteProduct productId={product.id} />
    </div>
  );
}

export default ProductActions;
