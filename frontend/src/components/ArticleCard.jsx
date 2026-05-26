import {
  formatArticleDate,
  tagStyles,
  truncateText,
} from "../utils/articles.js";

const ArticleCard = ({ article, onOpen }) => {
  const tag = article.tag || "all";
  const preview = truncateText(article.content, 260);

  return (
    <button
      type="button"
      onClick={() => onOpen(article)}
      className="group flex h-full w-full flex-col rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:focus-visible:ring-slate-700"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${tagStyles[tag] || tagStyles.all}`}
        >
          {tag}
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {formatArticleDate(article.publishing_date)}
        </span>
      </div>

      <div className="mt-5 flex-1 space-y-4 min-w-0">
        <p
          className="text-base leading-8 text-slate-800 dark:text-slate-200 sm:text-[1.05rem] break-words"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "break-word"
          }}
        >
          {preview}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>Tap to open options</span>
          <span className="text-slate-400 transition group-hover:text-slate-600">
            View details →
          </span>
        </div>
      </div>
    </button>
  );
};

export default ArticleCard;
