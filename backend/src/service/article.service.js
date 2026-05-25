import pool from "../config/db.config.js";
import { v7 as uuidv7 } from "uuid";

export const createArticleService = async (tag, title) => {
  const id = uuidv7();

  const query =
    "INSERT INTO articles (id, tags, content) VALUES ($1, $2, $3) RETURNING *";
  const values = [id, tag, title];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getArticlesService = async (
  p = 1,
  limit = 10,
  tag = null,
  startDate = null,
  endDate = null,
) => {
  let query = "SELECT * FROM articles WHERE 1=1";
  const values = [];
  let placeholderIndex = 1;

  if (tag) {
    query += ` AND tags = $${placeholderIndex++}`;
    values.push(tag);
  }

  if (startDate) {
    query += ` AND publishing_date >= $${placeholderIndex++}`;
    values.push(startDate);
  }

  if (endDate) {
    query += ` AND publishing_date <= $${placeholderIndex++}`;
    values.push(endDate);
  }

  query += ` ORDER BY publishing_date DESC`;
  const { rows: articles } = await pool.query(query, values);

  const total = articles.length;
  const startIndex = (p - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    total,
    data: articles.slice(startIndex, endIndex),
  };
};

export const getArticleService = async (id) => {
  const query = "SELECT * FROM articles WHERE id = $1";
  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
}


export const updateArticleService = async (id, { tag, content }) => {
  let query = "UPDATE articles SET ";
  const values = [];
  let placeholderIndex = 1;

  if (tag) {
    query += `tags = $${placeholderIndex++}`;
    values.push(tag);
  }

  if (content) {
    if (tag) query += ", ";
    query += `content = $${placeholderIndex++}`;
    values.push(content);
  }

  query += `, updated_at = $${placeholderIndex++}`;
  values.push(new Date().toISOString());

  query += ` WHERE id = $${placeholderIndex} RETURNING *`;
  values.push(id);

  const { rows } = await pool.query(query, values);

  return rows[0] || null;
};

export const deleteArticleService = async (id) => {
  const query = "DELETE FROM articles WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
};