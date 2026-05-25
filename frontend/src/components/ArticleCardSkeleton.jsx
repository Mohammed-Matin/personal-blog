const ArticleCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="mt-5 space-y-3">
        <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-4/6 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="mt-6 flex gap-3">
        <div className="h-10 w-20 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-10 w-20 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-10 w-20 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
