import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/types/product";
import { Button } from "@/components/ui/button";

interface SearchResultsProps {
  isLoading: boolean;
  results: Product[];
  searchQuery: string;
  handleProductClick: () => void;
  handleViewAll: () => void;
}

function SearchResults({
  isLoading,
  results,
  searchQuery,
  handleProductClick,
  handleViewAll,
}: SearchResultsProps) {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Searching...</div>;
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        No products found for &quot;{searchQuery}&quot;
      </div>
    );
  }

  return (
    <>
      {results.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          onClick={handleProductClick}
          className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors"
        >
          <Image
            src={product.image_url}
            alt={product.name}
            width={50}
            height={50}
            className="object-cover rounded"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900 text-sm">{product.name}</p>
            <p className="text-xs text-gray-500">{product.category}</p>
          </div>
          <p className="font-bold text-brand-500 text-sm">
            {product.price.toFixed(2)}
          </p>
        </Link>
      ))}
      <Button
        variant="link"
        onClick={handleViewAll}
        className="w-full p-3 text-center text-brand-500 font-medium hover:bg-gray-50 text-sm"
      >
        View all results for &quot;{searchQuery}&quot;
      </Button>
    </>
  );
}
export default SearchResults;
