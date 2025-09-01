import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  const createdAt = article.created_at?.seconds
    ? new Date(article.created_at.seconds * 1000).toLocaleDateString()
    : new Date(article.created_at).toLocaleDateString();

  return (
    <div className="flex-1 max-w-[400px] border border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform hover:scale-105 hover:shadow-lg">
      <Link to={`/articles/${article.article_id}`}>
        <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
      </Link>
      <img
        src={article.article_img_url || "https://via.placeholder.com/400"}
        alt={article.title}
        className="w-full h-auto rounded mb-2"
      />
      <p className="text-sm text-gray-600"><strong>Author:</strong> {article.author || "Unknown"}</p>
      <p className="text-sm text-gray-600"><strong>Topic:</strong> {article.topic?.toUpperCase() || "-"}</p>
      <p className="text-sm text-gray-600">🗨️ {article.comment_count ?? 0}</p>
      <p className="text-sm text-gray-600"><strong>Published:</strong> {createdAt}</p>
    </div>
  );
}

export default ArticleCard;