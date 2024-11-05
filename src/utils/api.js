import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-md74.onrender.com/api",
});

export const fetchArticles = () => {
  return api.get("/articles").then((response) => response.data.articles);
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

  