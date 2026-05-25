import { useEffect, useState } from "react";
import { tagOptions } from "../utils/articles.js";

const defaultForm = {
  tag: "technical",
  content: "",
};

const ArticleFormModal = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
  loading,
}) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      tag: initialData?.tag || "technical",
      content: initialData?.content || "",
    });
  }, [initialData, isOpen]);

  if (!isOpen) {
    return null;
  }

  const submitLabel = mode === "edit" ? "Update article" : "Create article";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-4xl border border-slate-200 bg-white p-6 shadow-2xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              {mode === "edit" ? "Edit article" : "Create article"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
              {mode === "edit" ? "Update article details" : "Add a new article"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(form);
          }}
        >
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Tag
            <select
              value={form.tag}
              onChange={(event) =>
                setForm((current) => ({ ...current, tag: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            >
              {tagOptions
                .filter((tag) => tag !== "all")
                .map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Content
            <textarea
              rows="7"
              value={form.content}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  content: event.target.value,
                }))
              }
              placeholder="Write article content..."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            />
          </label>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              {loading ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleFormModal;
