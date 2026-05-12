const BookCardSkeleton = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-52 bg-white/10" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
      <div className="h-3 bg-white/10 rounded w-1/3" />
      <div className="h-8 bg-white/10 rounded mt-4" />
    </div>
  </div>
);

export default BookCardSkeleton;
