import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-md74.onrender.com/api",
});

export const fetchArticles = (page = 1, limit = 6) => {
  return api
    .get("/articles", { 
      params: { limit, p: page },
    })
    .then((response) => ({
      articles: response.data.articles,
      total_count: parseInt(response.data.total_count),
    }));
};

export const fetchArticleById = (article_id) => {
    return api.get(`/articles/${article_id}`).then((response) => response.data.article);
  };

  export const fetchCommentsByArticleId = (article_id) => {
    return api.get(`/articles/${article_id}/comments`).then((response) => response.data.comments);
  };

  export const voteOnArticle = (article_id, voteChange) => {
    return api.patch(`/articles/${article_id}`, { inc_votes: voteChange });
  };

  export const postComment = (article_id, commentBody) => {
    return api.post(`/articles/${article_id}/comments`, {
      body: commentBody,
    });
  };

  

