"use client";
import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DesktopSearch from "./DesktopSearch";
import MobileSearch from "./MobileSearch";
import { Product } from "@/app/types/product";
import { getProducts } from "@/app/_lib/actions";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search when typing
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsLoading(true);
        const { products } = await getProducts({ searchQuery });
        setResults(products);
        setShowResults(true);
        setIsLoading(false);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  function handleClear() {
    setSearchQuery("");
    setResults([]);
    setShowResults(false);
  }

  function handleViewAll() {
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    setShowResults(false);
    setIsOpen(false);
  }

  function handleProductClick() {
    setShowResults(false);
    setIsOpen(false);
  }

  return (
    <div ref={searchRef} className="relative">
      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClear={handleClear}
          showResults={showResults}
          isLoading={isLoading}
          results={results}
          handleProductClick={handleProductClick}
          handleViewAll={handleViewAll}
        />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <Button
          size="icon"
          variant="icon"
          onClick={() => setIsOpen((open) => !open)}
        >
          <SearchIcon className="h-5 w-5 text-gray-600" />
        </Button>

        {isOpen && (
          <MobileSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleClear={handleClear}
            showResults={showResults}
            isLoading={isLoading}
            results={results}
            handleProductClick={handleProductClick}
            handleViewAll={handleViewAll}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
