import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Eye } from "lucide-react";

import { Product } from "@/app/types/product";
import Image from "next/image";

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <>
      {/* Desktop table view */}
      <div className="hidden lg:block">
        <Card className="border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Variants
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Created
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-24 h-24 relative rounded-md overflow-hidden ">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-800"
                      >
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={product.has_variants ? "default" : "outline"}
                        className={
                          product.has_variants
                            ? "text-white bg-brand-500"
                            : "border-gray-200 text-gray-700 "
                        }
                      >
                        {product.has_variants ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.created_at
                        ? new Date(product.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Mobile card view */}
      <div className="lg:hidden space-y-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {product.name}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 text-xs"
                    >
                      {product.category}
                    </Badge>
                    <Badge
                      variant={product.has_variants ? "default" : "outline"}
                      className={`text-xs ${
                        product.has_variants
                          ? "text-white"
                          : "border-gray-200 text-gray-700"
                      }`}
                      style={
                        product.has_variants
                          ? { backgroundColor: "var(--color-brand-500)" }
                          : {}
                      }
                    >
                      {product.has_variants ? "Variants" : "No Variants"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-600">Stock</p>
                  <p className="font-semibold text-gray-900">{product.stock}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Created</p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {product.created_at
                      ? new Date(product.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-xs">
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-xs">
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
