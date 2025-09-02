import { useState } from "react";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: any[]; // 🔑 you can replace `any` with an Article type later
};

function ArticlesList({ articles }: Props) {
  const [page, setPage] = useState(1);
  const articlesPerPage = 6;

  // slice according to pagination
  const currentArticles = articles.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  const totalArticles = articles.length;

  if (!articles || articles.length === 0) {
    return <p className="text-center p-4">No articles available.</p>;
  }

  return (
    <section
      className="p-4 max-w-[1200px] mx-auto"
      aria-labelledby="all-articles-title"
    >
      <h1 id="all-articles-title" className="text-4xl font-bold mb-4">
        All Articles
      </h1>

      <div className="flex flex-wrap justify-center gap-5">
        {currentArticles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>

      <nav
        className="flex justify-center items-center gap-4 mt-6"
        aria-label="Pagination"
      >
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
          disabled={page * articlesPerPage >= totalArticles}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </section>
  );
}

export default ArticlesList;