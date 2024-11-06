import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";
import "./TopicArticles.css";

function TopicArticles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic(topic)
      .then((fetchedArticles) => {
        console.log("Fetched articles:", fetchedArticles);
        setArticles(fetchedArticles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles by topic:", error);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
      });
  }, [topic]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="topic-articles">
      <h2>Articles on "{topic}"</h2>
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
