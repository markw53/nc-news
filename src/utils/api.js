import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-md74.onrender.com/api",
});

export const fetchArticles = () => {
  return api.get("/articles").then((response) => response.data.articles);
};

