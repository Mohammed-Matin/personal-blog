import { tagOptions } from "../utils/articles.js";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const ArticleFilters = ({ filters, onChange, onReset }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-4 sm:grid-cols-3">
          <label className="text-sm font-medium text-slate-700">
            Tag
            <select
              value={filters.tag}
              onChange={(event) => onChange({ tag: event.target.value })}
              className={fieldClass}
            >
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === "all" ? "All tags" : tag}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Start date
            <input
              type="date"
              value={filters.startDate}
              onChange={(event) => onChange({ startDate: event.target.value })}
              className={fieldClass}
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            End date
            <input
              type="date"
              value={filters.endDate}
              onChange={(event) => onChange({ endDate: event.target.value })}
              className={fieldClass}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Reset filters
        </button>
      </div>
    </section>
  );
};

export default ArticleFilters;
