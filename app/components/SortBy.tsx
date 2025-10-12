"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SortByProps {
  options: { value: string; label: string }[];
}

function SortBy({ options }: SortByProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const currentSort = searchParams.get("sortBy") || options[0].value;

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", value);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  // find label for currently selected option
  const currentLabel = options.find((opt) => opt.value === currentSort)?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Sort by: {currentLabel}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleClick(option.value)}
            className="flex items-center justify-between"
          >
            {option.label}
            {option.value === currentSort && (
              <Check className="h-4 w-4 text-brand-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortBy;
