import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
});

const normalizeArticle = (article) => ({
  id: article.id,
  tag: article.tag ?? article.tags ?? "",
  content: article.content ?? "",
  publishing_date:
    article.publishing_date ?? article.createdAt ?? article.created_at ?? "",
});

export const articlesApi = {
  async listArticles(params = {}) {
    const { data } = await api.get("/api/v1/articles", { params });
    return {
      total: data.total ?? 0,
      data: Array.isArray(data.data) ? data.data.map(normalizeArticle) : [],
    };
  },

  async createArticle(payload) {
    const { data } = await api.post("/api/v1/articles", payload);
    return normalizeArticle(data.article);
  },

  async updateArticle(id, payload) {
    const { data } = await api.patch(`/api/v1/articles/${id}`, payload);
    return normalizeArticle(data.article);
  },

  async deleteArticle(id) {
    await api.delete(`/api/v1/articles/${id}`);
  },
};

export default api;
