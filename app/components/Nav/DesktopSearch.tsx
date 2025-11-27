import { Product } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import SearchResults from "./SearchResults";

interface DesktopSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClear: () => void;
  showResults: boolean;
  isLoading: boolean;
  results: Product[];
  handleProductClick: () => void;
  handleViewAll: () => void;
}
function DesktopSearch({
  searchQuery,
  setSearchQuery,
  handleClear,
  showResults,
  isLoading,
  results,
  handleProductClick,
  handleViewAll,
}: DesktopSearchProps) {
  return (
    <>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 pl-10 pr-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        {searchQuery && (
          <Button
            variant="icon"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {showResults && (
          <div className="absolute top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
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
    </>
  );
}

export default DesktopSearch;
