import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import ErrorMessage from "./ErrorMessage";
import "./TopicArticles.css";

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

  const handleSortChange = (e) => {
    setSearchParams({ sort_by: e.target.value, order });
  };

  const handleOrderToggle = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setSearchParams({ sort_by: sortBy, order: newOrder });
  };

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="topic-articles">
      <header aria-labelledby="topic-header">
        <h2 id="topic-header">Articles on "{topic}"</h2>
      </header>

      {error && <ErrorMessage message={error} />}

      <section className="sort-controls" aria-labelledby="sort-controls-header">
        <h3 id="sort-controls-header" className="visually-hidden">
          Sort Controls
        </h3>
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={handleSortChange}
          aria-label="Sort articles by"
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <button
          onClick={handleOrderToggle}
          aria-label={`Toggle order to ${
            order === "asc" ? "descending" : "ascending"
          }`}
        >
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </section>

      <section className="articles-grid" aria-labelledby="articles-grid-header">
        <h3 id="articles-grid-header" className="visually-hidden">
          Articles List
        </h3>
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
