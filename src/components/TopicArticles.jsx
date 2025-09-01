import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import ErrorMessage from "./ErrorMessage";

function TopicArticles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchArticlesByTopic(topic, sortBy, order)
      .then(({ articles = [] }) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.error("Error fetching articles by topic:", err);
        setError("Failed to load articles. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [topic, sortBy, order]);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="p-5">
  <h2 className="text-xl font-bold mb-3">Articles on “{topic}”</h2>
  {articles.length ? (
    <div className="flex flex-wrap justify-center gap-5">
      {articles.map((a) => <ArticleCard key={a.article_id} article={a}/>)}
    </div>
  ) : <p>No articles available for this topic.</p>}
</div>
  );
}

export default TopicArticles;