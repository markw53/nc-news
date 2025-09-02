// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:9090/api"  ,
});

// ----------------- ARTICLES -----------------

/**
 * Fetch paginated list of articles
 */
export const fetchArticles = (page = 1, limit = 6) => {
  return api
    .get("/articles", { params: { limit, p: page } })
    .then((res) => ({
      articles: res.data.articles || [],                       // safe default
      total_count: Number(res.data.total_count ?? 0),          // safe parse
    }));
};

/**
 * Fetch a single article by ID
 */
export const fetchArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then((res) => ({
    ...res.data.article,
    votes: res.data.article?.votes ?? 0,                       // ensure votes field
    comment_count: res.data.article?.comment_count ?? 0,       // fallback for Firestore
  }));
};

/**
 * Increment/decrement article votes
 */
export const voteOnArticle = (article_id, voteChange) => {
  return api
    .patch(`/articles/${article_id}/votes`, { inc_votes: voteChange })
    .then((res) => ({
      ...res.data.article,
      votes: res.data.article?.votes ?? 0,
    }));
};

/**
 * Fetch articles filtered by topic
 */
export const fetchArticlesByTopic = (
  topic,
  sortBy = "created_at",
  order = "desc",
  page = 1,
  limit = 6
) => {
  return api
    .get("/articles", {
      params: { topic, sort_by: sortBy, order, p: page, limit },
    })
    .then((res) => ({
      articles: res.data.articles || [],
      total_count: Number(res.data.total_count ?? 0),
    }));
};

// ----------------- COMMENTS -----------------

export const fetchCommentsByArticleId = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((res) => res.data.comments || []);
};

export const postComment = async (article_id, commentBody, author) => {
  const res = await api.post(`/articles/${article_id}/comments`, {
    username: author,
    body: commentBody,
  });
  return {
    ...res.data.comment,
    votes: res.data.comment?.votes ?? 0,
  };
};

export const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`);
};

export const voteOnComment = (comment_id, voteChange) => {
  return api
    .patch(`/comments/${comment_id}/votes`, { inc_votes: voteChange })
    .then((res) => ({
      ...res.data.comment,
      votes: res.data.comment?.votes ?? 0,
    }));
};

// ----------------- TOPICS -----------------

export const fetchTopics = () => {
  return api.get("/topics").then((res) => res.data.topics || []);
};

// ----------------- USERS -----------------

export const fetchUsers = () => {
  return api.get("/users").then((res) => res.data.users || []);
};

export const fetchUserByUsername = (username) => {
  return api.get(`/users/${username}`).then((res) => res.data.user);
};

export default api;