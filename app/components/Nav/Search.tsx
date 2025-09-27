"use client";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative">
      <div className="hidden lg:block">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 pl-10 pr-4"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border p-3 z-50">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
