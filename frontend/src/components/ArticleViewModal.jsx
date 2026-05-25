import {
  formatArticleDate,
  tagStyles,
  truncateText,
} from "../utils/articles.js";

const ArticleViewModal = ({ isOpen, article, onClose, onEdit }) => {
  if (!isOpen || !article) {
    return null;
  }

  const tag = article.tag || "all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-4xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Article detail
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              View article
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${tagStyles[tag] || tagStyles.all}`}
            >
              {tag}
            </span>
            <span className="text-sm text-slate-500">
              {formatArticleDate(article.publishing_date)}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {truncateText(article.content, 2000)}
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onEdit(article)}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Edit article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleViewModal;
