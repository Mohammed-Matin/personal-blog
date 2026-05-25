import { useEffect, useState } from "react";
import { articlesApi } from "../api/api.js";

const initialFilters = {
  tag: "all",
  startDate: "",
  endDate: "",
};

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadArticles = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {
          p: page,
          limit,
        };

        if (filters.tag && filters.tag !== "all") {
          params.tag = filters.tag;
        }

        if (filters.startDate) {
          params.startDate = filters.startDate;
        }

        if (filters.endDate) {
          params.endDate = filters.endDate;
        }

        const response = await articlesApi.listArticles(params);

        if (ignore) {
          return;
        }

        setArticles(response.data);
        setTotal(response.total);
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || "Failed to load articles.");
          setArticles([]);
          setTotal(0);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadArticles();

    return () => {
      ignore = true;
    };
  }, [filters, page, limit, refreshToken]);

  const refetch = () => setRefreshToken((value) => value + 1);

  const updateFilters = (nextFilters) => {
    setPage(1);
    setFilters((current) => ({ ...current, ...nextFilters }));
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    articles,
    total,
    page,
    setPage,
    limit,
    filters,
    setFilters: updateFilters,
    loading,
    error,
    totalPages,
    refetch,
    setArticles,
  };
};
