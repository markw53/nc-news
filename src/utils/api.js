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