import {
  formatArticleDate,
  tagStyles,
  truncateText,
} from "../utils/articles.js";

const ArticleViewModal = ({ isOpen, article, onClose, onEdit, onDelete }) => {
  if (!isOpen || !article) {
    return null;
  }

  const tag = article.tag || "all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-4xl border border-slate-200 bg-white p-6 shadow-2xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-start justify-between gap-4 shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Article detail
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
              View article
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 shrink-0"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-5 overflow-y-auto min-h-0">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${tagStyles[tag] || tagStyles.all}`}
            >
              {tag}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {formatArticleDate(article.publishing_date)}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 dark:border-slate-700 dark:bg-slate-950">
            <p className="whitespace-pre-wrap text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-200 break-words" style={{wordBreak: "break-word"}}>
              {truncateText(article.content, 2000)}
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end shrink-0 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onEdit(article)}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Edit article
            </button>
            <button
              type="button"
              onClick={() => onDelete(article)}
              className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/80 dark:text-rose-200 dark:hover:bg-rose-900"
            >
              Delete article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleViewModal;
