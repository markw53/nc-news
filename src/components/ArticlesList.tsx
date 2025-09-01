import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 6;

  useEffect(() => {
    setLoading(true);
    fetchArticles(page, articlesPerPage)
      .then(({ articles, total_count }) => {
        setArticles(articles || []);
        setTotalArticles(total_count ?? 0);
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p>Loading articles...</p>;

  return (
    <section className="p-4 max-w-[1200px] mx-auto" aria-labelledby="all-articles-title">
      <h1 id="all-articles-title" className="text-4xl font-bold mb-4">All Articles</h1>

      <div className="flex flex-wrap justify-center gap-5">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>

      <nav className="flex justify-center items-center gap-4 mt-6" aria-label="Pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {Math.max(1, Math.ceil(totalArticles / articlesPerPage))}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(totalArticles / articlesPerPage)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </section>
  );
}

export default ArticlesList;