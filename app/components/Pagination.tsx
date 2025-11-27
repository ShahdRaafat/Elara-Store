"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2  ${
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        <ChevronLeft />
      </Link>

      {/* Show page number of total pages number*/}
      <span className="px-4 py-2 rounded-lg border bg-brand-500 text-white">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2  ${
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        <ChevronRight />
      </Link>
    </div>
  );
}
