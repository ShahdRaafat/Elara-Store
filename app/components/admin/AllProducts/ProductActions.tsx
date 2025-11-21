import { Product } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { Edit2, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

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
      <Button
        variant="icon"
        className="flex-1 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default ProductActions;
