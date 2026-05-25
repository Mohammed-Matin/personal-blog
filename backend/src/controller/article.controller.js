import { createArticleService, getArticlesService, getArticleService, updateArticleService, deleteArticleService } from '../service/article.service.js';

export const createArticleController = async (req, res) => {
  const { tag, content } = req.body;

  const validTags = ["technical", "brainrot", "cultural"];

  if (!tag || !content) {
    return res.status(400).json({
      message: "Tag and content are required fields.",
    });
  }

  if (!validTags.includes(tag)) {
    return res.status(400).json({
      message: `Invalid tag. Allowed values are: ${validTags.join(", ")}`,
    });
  }

  try {
    const article = await createArticleService(tag, content);

    return res.status(201).json({
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const getArticlesController = async (req, res) => {
  let { p = 1, limit = 10, tag, startDate, endDate } = req.query;
  p = parseInt(p);
  limit = parseInt(limit)

  try {
    const result = await getArticlesService(p, limit, tag, startDate, endDate);    
    return res.status(200).json({
      message: "Articles fetched successfully",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getArticleController = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await getArticleService(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    return res.status(200).json({
      message: "Article fetched successfully",
      article,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const updateArticleController = async (req, res) => {
  const { id } = req.params;
  const { tag, content } = req.body;

  const validTags = ["technical", "brainrot", "cultural"];

  // Validation: Check if at least one field is provided
  if (!tag && !content) {
    return res.status(400).json({
      message: "At least one field (tag or content) is required to update.",
    });
  }

  // Validation: Check if tag is valid if provided
  if (tag && !validTags.includes(tag)) {
    return res.status(400).json({
      message: `Invalid tag. Allowed values are: ${validTags.join(", ")}`,
    });
  }

  try {
    const updatedArticle = await updateArticleService(id, { tag, content });

    if (!updatedArticle) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    return res.status(200).json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteArticleController = async (req, res) => {
  const { id } = req.params;

  if(!id) {
    return res.status(400).json({
      message: "Article ID is required",
    });
  }

  try {
    const article = await deleteArticleService(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    return res.status(204).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};