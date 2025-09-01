import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [error, setError] = useState(null);
  const articlesPerPage = 6;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchArticles(page, articlesPerPage)
      .then(({ articles, total_count }) => {
        setArticles(articles || []);                // ✅ fallback
        setTotalArticles(total_count ?? 0);         // ✅ fallback
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Could not load articles. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handleNextPage = () => {
    if (page < Math.ceil(totalArticles / articlesPerPage)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;
  if (!articles.length) return <p>No articles found.</p>;

  return (
    <section
      className="articles-list-container"
      aria-labelledby="all-articles-title"
    >
      <h1 id="all-articles-title">All Articles</h1>

      <div className="articles-grid" aria-label="Articles List">
        {articles.map((article) => (
          // ✅ Pass safe defaults into ArticleCard
          <ArticleCard
            key={article.article_id}
            article={{
              ...article,
              votes: article.votes ?? 0,
              comment_count: article.comment_count ?? 0,
            }}
          />
        ))}
      </div>

      <nav className="pagination-controls" aria-label="Pagination">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          Prev Page
        </button>

        <span aria-live="polite">
          Page {page} of {Math.max(1, Math.ceil(totalArticles / articlesPerPage))}
        </span>

        <button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(totalArticles / articlesPerPage)}
          aria-label="Next Page"
        >
          Next Page
        </button>
      </nav>
    </section>
  );
}

export default ArticlesList;