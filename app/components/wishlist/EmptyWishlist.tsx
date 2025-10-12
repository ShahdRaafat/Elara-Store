export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center text-gray-600">
      <p className="text-lg font-medium">Your wishlist is empty 💔</p>
      <p className="text-sm text-gray-500 mt-2">
        Start exploring and add your favorite items!
      </p>
    </div>
  );
}
