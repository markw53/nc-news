import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-md74.onrender.com/api"
});

export const fetchArticles = (page = 1, limit = 6) => {
  return api
    .get("/articles", {
      params: { limit, p: page }
    })
    .then(response => ({
      articles: response.data.articles,
      total_count: parseInt(response.data.total_count)
    }));
};

export const fetchArticleById = article_id => {
  return api
    .get(`/articles/${article_id}`)
    .then(response => response.data.article);
};

export const fetchCommentsByArticleId = article_id => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(response => response.data.comments);
};

export const voteOnArticle = (article_id, voteChange) => {
  return api.patch(`/articles/${article_id}`, { inc_votes: author });
};

export const postComment = async (article_id, commentBody, author) => {
  try {
    const response = await api.post(`/articles/${article_id}/comments`, {
      username: author,
      body: commentBody
    });
    return response.data.comment;
  } catch (error) {
    console.error("Error in postComment:", error);
    throw error;
  }
};

export const deleteComment = comment_id => {
  return api.delete(`/comments/${comment_id}`);
};

export const fetchTopics = async () => {
  const response = await api.get(`/topics`);
  console.log("Fetched topics:", response.data);
  return response.data;
};

export const fetchArticlesByTopic = (
  topic,
  sortBy = "created_at",
  order = "desc"
) => {
  return api
    .get("/articles", {
      params: {
        topic,
        sort_by: sortBy,
        order
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching articles by topic:", error);
      throw error;
    });
};

export const fetchUsers = () => {
  return api.get("/users").then(res => {
    return res.data.users;
  });
};

export default api;
