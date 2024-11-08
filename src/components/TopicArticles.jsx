import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import ErrorMessage from "./ErrorMessage";

function TopicArticles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchArticlesByTopic(topic, sortBy, order)
      .then((fetchedArticles) => {
        console.log("Fetched articles:", fetchedArticles);
        setArticles(fetchedArticles.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles by topic:", error);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
      });
  }, [topic, sortBy, order]);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="topic-articles">
      <header aria-labelledby="topic-header">
        <h2 id="topic-header">Articles on "{topic}"</h2>
      </header>

      {error && <ErrorMessage message={error} />}

      <section className="articles-grid" aria-labelledby="articles-grid-header">
        <h3 id="articles-grid-header" className="visually-hidden"></h3>
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        ) : (
          <p>No articles available for this topic.</p>
        )}
      </section>
    </div>
  );
}

export default TopicArticles;
