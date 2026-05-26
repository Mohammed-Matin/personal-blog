import { useMemo, useState } from "react";
import { articlesApi } from "../api/api.js";
import ArticleCard from "../components/ArticleCard.jsx";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton.jsx";
import ArticleFilters from "../components/ArticleFilters.jsx";
import ArticleFormModal from "../components/ArticleFormModal.jsx";
import ArticleViewModal from "../components/ArticleViewModal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import Pagination from "../components/Pagination.jsx";
import ToastStack from "../components/ToastStack.jsx";
import { useArticles } from "../hooks/useArticles.js";
import { truncateText } from "../utils/articles.js";

const ArticlesDashboardPage = () => {
  const {
    articles,
    page,
    setPage,
    filters,
    setFilters,
    loading,
    totalPages,
    refetch,
    setArticles,
  } = useArticles();

  const [modalState, setModalState] = useState({
    open: false,
    mode: "create",
    article: null,
  });
  const [deleteState, setDeleteState] = useState({
    open: false,
    article: null,
    loading: false,
  });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  const totalLabel = useMemo(() => {
    if (loading) {
      return "Loading articles...";
    }

    return `${articles.length} article${articles.length === 1 ? "" : "s"}`;
  }, [articles.length, loading]);

  const pushToast = (type, title, message = "") => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, type, title, message }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const openCreateModal = () => {
    setModalState({ open: true, mode: "create", article: null });
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
    setDeleteState({ open: true, article, loading: false });
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
    <main className="mx-auto w-full max-w-6xl px-3 py-6 transition-colors duration-300 sm:px-6 sm:py-8 lg:px-8">
      <ToastStack toasts={toasts} />

      <section className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 break-words">
          Articles dashboard
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-50 break-words" style={{wordBreak: "break-word"}}>
          “We shape our words, then our words shape us.”
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300 break-words">
          Articles are small records of thought, and thought is never still. Use
          this space to collect them, refine them, and let the archive stay
          readable at a glance.
        </p>
      </section>

      <section className="mx-auto mt-8 max-w-5xl space-y-4">
        <div className="flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-5 lg:flex-row lg:items-end lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 break-words">
              Article controls
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl break-words" style={{wordBreak: "break-word"}}>
              Manage articles
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 break-words">
              {totalLabel}
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white sm:w-auto shrink-0"
          >
            Create article
          </button>
        </div>

        <ArticleFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </section>

      <section className="mx-auto mt-8 max-w-5xl rounded-4xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6 min-w-0">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        ) : hasArticles ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onOpen={openViewArticle}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center text-sm text-slate-600 break-words">
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
      </section>

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
        onCancel={() =>
          setDeleteState({ open: false, article: null, loading: false })
        }
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
        onDelete={(article) => {
          setSelectedArticle(null);
          handleDelete(article);
        }}
      />
    </main>
  );
};

export default ArticlesDashboardPage;
