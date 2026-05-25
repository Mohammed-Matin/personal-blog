const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Page{" "}
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {totalPages}
        </span>
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={page <= 1}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={page >= totalPages}
          className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
