"use client";

import { useWishlist } from "@/app/_contexts/WishlistContext";
import EmptyWishlist from "./EmptyWishlist";
import WishlistRow from "./WishlistRow";
import WishlistCard from "./WishlistCard";

export default function WishlistTable() {
  const { wishlist } = useWishlist();

  if (!wishlist.length) return <EmptyWishlist />;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      {/* Table for desktop */}
      <table className="hidden min-w-full text-sm text-gray-700 md:table">
        <thead className="bg-gray-50 text-left text-gray-600 text-xs uppercase tracking-wide border-b">
          <tr>
            <th className="py-3 px-4">Products</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Stock Status</th>
            <th className="py-3 px-4 text-right"></th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((item) => (
            <WishlistRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>

      {/* Mobile */}
      <div className="md:hidden flex flex-col divide-y">
        {wishlist.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
