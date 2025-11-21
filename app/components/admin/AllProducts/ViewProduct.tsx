"use client";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Product } from "@/app/types/product";
import ProductViewModal from "./ProductViewModal";

export default function ViewProduct({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="icon"
        className="flex-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={() => setOpen(true)}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <ProductViewModal
        open={open}
        onClose={() => setOpen(false)}
        product={product}
      />
    </>
  );
}
