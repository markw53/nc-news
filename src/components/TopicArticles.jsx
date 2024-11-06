import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
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
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="topic-articles">
      <h2>Articles on "{topic}"</h2>
      
      <div className="sort-controls">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <button onClick={handleOrderToggle}>
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="articles-grid">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        ) : (
          <p>No articles available for this topic.</p>
        )}
      </div>
    </div>
  );
}

export default TopicArticles;
