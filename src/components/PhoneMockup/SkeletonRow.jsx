const SkeletonRow = () => {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="h-12 w-9 rounded-lg bg-white/10 animate-shimmer" />
        <div className="space-y-2">
          <div className="h-3 w-32 rounded-full bg-white/10 animate-shimmer" />
          <div className="h-2 w-20 rounded-full bg-white/10 animate-shimmer" />
        </div>
      </div>
      <div className="h-8 w-8 rounded-full bg-white/10 animate-shimmer" />
    </div>
  );
};

export default SkeletonRow;
