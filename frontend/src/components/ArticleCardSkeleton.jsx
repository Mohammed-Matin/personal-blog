const ArticleCardSkeleton = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="mt-5 space-y-3">
        <div className="h-5 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-11/12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-10/12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-8/12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
