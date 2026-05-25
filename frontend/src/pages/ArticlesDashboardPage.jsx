import { useMemo, useState } from "react";
import { articlesApi } from "../api/api.js";
import ArticleCard from "../components/ArticleCard.jsx";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton.jsx";
import ArticleFilters from "../components/ArticleFilters.jsx";
import ArticleFormModal from "../components/ArticleFormModal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import Pagination from "../components/Pagination.jsx";
import ToastStack from "../components/ToastStack.jsx";
import ArticleViewModal from "../components/ArticleViewModal.jsx";
import { useArticles } from "../hooks/useArticles.js";
import { tagOptions, truncateText } from "../utils/articles.js";

const emptyCreateForm = {
  tag: "technical",
  content: "",
};

const ArticlesDashboardPage = () => {
  const {
    articles,
    page,
    setPage,
    filters,
    setFilters,
    loading,
    error,
    totalPages,
    refetch,
    setArticles,
  } = useArticles();

  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [saving, setSaving] = useState(false);
  const [modalState, setModalState] = useState({
    open: false,
    mode: "create",
    article: null,
  });
  const [deleteState, setDeleteState] = useState({
    open: false,
    article: null,
  });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [toasts, setToasts] = useState([]);

  const totalLabel = useMemo(() => {
    if (loading) {
      return "Loading articles...";
    }

    return `${articles.length} article${articles.length === 1 ? "" : "s"} on this page`;
  }, [articles.length, loading]);

  const pushToast = (type, title, message = "") => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, type, title, message }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!createForm.content.trim()) {
      pushToast(
        "error",
        "Content required",
        "Please write article content before submitting.",
      );
      return;
    }

    setSaving(true);

    try {
      await articlesApi.createArticle(createForm);
      setCreateForm(emptyCreateForm);
      pushToast(
        "success",
        "Article created",
        "The new article has been saved.",
      );
      refetch();
    } catch (requestError) {
      pushToast(
        "error",
        "Create failed",
        requestError?.response?.data?.message || "Could not create article.",
      );
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (article) => {
    setModalState({ open: true, mode: "edit", article });
  };

  const openViewArticle = (article) => {
    setSelectedArticle(article);
  };

  const handleModalSubmit = async (form) => {
    if (!form.content.trim()) {
      pushToast(
        "error",
        "Content required",
        "Article content cannot be empty.",
      );
      return;
    }

    setSaving(true);

    try {
      if (modalState.mode === "edit" && modalState.article) {
        const updatedArticle = await articlesApi.updateArticle(
          modalState.article.id,
          form,
        );
        setArticles((current) =>
          current.map((article) =>
            article.id === updatedArticle.id ? updatedArticle : article,
          ),
        );
        pushToast(
          "success",
          "Article updated",
          "Your changes were saved successfully.",
        );
      } else {
        await articlesApi.createArticle(form);
        pushToast("success", "Article created", "The article has been added.");
        refetch();
      }

      setModalState({ open: false, mode: "create", article: null });
    } catch (requestError) {
      pushToast(
        "error",
        "Save failed",
        requestError?.response?.data?.message || "Could not save article.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (article) => {
    setDeleteState({ open: true, article });
  };

  const confirmDelete = async () => {
    const article = deleteState.article;

    if (!article) {
      return;
    }

    setDeleteState((current) => ({ ...current, loading: true }));

    const snapshot = articles;
    setArticles((current) => current.filter((item) => item.id !== article.id));

    try {
      await articlesApi.deleteArticle(article.id);
      pushToast(
        "success",
        "Article deleted",
        "The article was removed successfully.",
      );
    } catch (requestError) {
      setArticles(snapshot);
      pushToast(
        "error",
        "Delete failed",
        requestError?.response?.data?.message || "Could not delete article.",
      );
    } finally {
      setDeleteState({ open: false, article: null, loading: false });
    }
  };

  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters);
  };

  const handleResetFilters = () => {
    setFilters({ tag: "all", startDate: "", endDate: "" });
  };

  const hasArticles = articles.length > 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ToastStack toasts={toasts} />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Article overview
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Manage articles with a clean dashboard
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Create, filter, update, and delete articles from one focused
            workspace. The UI is built to stay simple, responsive, and fast.
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            Status
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>{totalLabel}</p>
            <p>{error ? error : "Connected to the articles API."}</p>
            <p>
              Supported tags:{" "}
              {tagOptions.filter((tag) => tag !== "all").join(", ")}.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Create article
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                New entry
              </h3>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleCreate}>
            <label className="block text-sm font-medium text-slate-700">
              Tag
              <select
                value={createForm.tag}
                onChange={(event) =>
                  setCreateForm((current) => ({
                    ...current,
                    tag: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
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

            <label className="block text-sm font-medium text-slate-700">
              Content
              <textarea
                rows="8"
                value={createForm.content}
                onChange={(event) =>
                  setCreateForm((current) => ({
                    ...current,
                    content: event.target.value,
                  }))
                }
                placeholder="Write article content..."
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Create article"}
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <ArticleFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Articles list
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Latest articles
                </h3>
              </div>
              <p className="text-sm text-slate-500">{totalLabel}</p>
            </div>

            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))}
              </div>
            ) : hasArticles ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onView={openViewArticle}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center text-sm text-slate-600">
                No articles found. Try changing filters or create a new article.
              </div>
            )}

            <div className="mt-6">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage((current) => Math.max(1, current - 1))}
                onNext={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              />
            </div>
          </div>
        </section>
      </div>

      <ArticleFormModal
        isOpen={modalState.open}
        mode={modalState.mode}
        initialData={modalState.article}
        onClose={() =>
          setModalState({ open: false, mode: "create", article: null })
        }
        onSubmit={handleModalSubmit}
        loading={saving}
      />

      <ConfirmDialog
        isOpen={deleteState.open}
        title="Delete article"
        description={`This will permanently remove: ${truncateText(deleteState.article?.content || "", 100)}`}
        confirmLabel="Delete article"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteState({ open: false, article: null })}
        loading={deleteState.loading}
      />

      <ArticleViewModal
        isOpen={Boolean(selectedArticle)}
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onEdit={(article) => {
          setSelectedArticle(null);
          openEditModal(article);
        }}
      />
    </main>
  );
};

export default ArticlesDashboardPage;
