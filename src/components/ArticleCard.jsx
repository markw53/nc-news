import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  // Handle Firestore Timestamp or ISO string dates
  let formattedDate = "Unknown date";
  if (article?.created_at) {
    try {
      const dateValue =
        article.created_at.seconds !== undefined
          ? new Date(article.created_at.seconds * 1000)
          : new Date(article.created_at);
      formattedDate = dateValue.toLocaleDateString();
    } catch {
      formattedDate = "Invalid date";
    }
  }

  return (
    <div
      className="article-card"
      role="article"
      aria-labelledby={`article-title-${article.article_id || "unknown"}`}
    >
      <Link
        to={`/articles/${article.article_id}`}
        aria-label={`Read more about ${article.title || "Untitled"}`}
      >
        <h2 id={`article-title-${article.article_id || "unknown"}`}>
          {article.title || "Untitled Article"}
        </h2>
      </Link>

      <img
        src={
          article.article_img_url ||
          "https://via.placeholder.com/400x300?text=No+Image"
        }
        alt={`Image for ${article.title || "Untitled Article"}`}
        className="article-image"
        aria-describedby={`article-description-${article.article_id || "unknown"}`}
      />

      <div
        id={`article-description-${article.article_id || "unknown"}`}
        className="article-info"
      >
        <p>
          <strong>Author:</strong>{" "}
          <span aria-label="Author">{article.author || "Unknown"}</span>
        </p>
        <p>
          <strong>Topic:</strong>{" "}
          <span aria-label="Topic">
            {article.topic ? article.topic.toUpperCase() : "Uncategorized"}
          </span>
        </p>
        <p>
          <strong>🗨️</strong>{" "}
          <span aria-label="Comment count">{article.comment_count ?? 0}</span>
        </p>
        <p>
          <strong>Published:</strong>{" "}
          <span aria-label="Publication date">{formattedDate}</span>
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;