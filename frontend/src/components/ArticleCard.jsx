import {
  formatArticleDate,
  tagStyles,
  truncateText,
} from "../utils/articles.js";

const ArticleCard = ({ article, onView, onEdit, onDelete }) => {
  const tag = article.tag || "all";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${tagStyles[tag] || tagStyles.all}`}
        >
          {tag}
        </span>
        <span className="text-xs font-medium text-slate-500">
          {formatArticleDate(article.publishing_date)}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-700">
        {truncateText(article.content, 220)}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onView(article)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          View
        </button>
        <button
          type="button"
          onClick={() => onEdit(article)}
          className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(article)}
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;
