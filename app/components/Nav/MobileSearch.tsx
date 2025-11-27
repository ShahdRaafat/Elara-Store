import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Product } from "@/app/types/product";
import SearchResults from "./SearchResults";

interface MobileSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClear: () => void;
  showResults: boolean;
  isLoading: boolean;
  results: Product[];
  handleProductClick: () => void;
  handleViewAll: () => void;
  setIsOpen: (open: boolean) => void;
}

function MobileSearch({
  searchQuery,
  setSearchQuery,
  handleClear,
  showResults,
  isLoading,
  results,
  handleProductClick,
  handleViewAll,
  setIsOpen,
}: MobileSearchProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="absolute top-0 left-0 right-0 bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full pl-10 pr-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {showResults && (
          <div className="mt-2 max-h-[70vh] overflow-y-auto">
            <SearchResults
              isLoading={isLoading}
              results={results}
              searchQuery={searchQuery}
              handleProductClick={handleProductClick}
              handleViewAll={handleViewAll}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default MobileSearch;
