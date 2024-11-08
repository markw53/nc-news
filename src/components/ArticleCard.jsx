import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <div
      className="article-card"
      role="article"
      aria-labelledby={`article-title-${article.article_id}`}
    >
      <Link
        to={`/articles/${article.article_id}`}
        aria-label={`Read more about ${article.title}`}
      >
        <h2 id={`article-title-${article.article_id}`}>{article.title}</h2>
      </Link>

      <img
        src={article.article_img_url}
        alt={`Image for ${article.title}`}
        className="article-image"
        aria-describedby={`article-description-${article.article_id}`}
      />

      <div
        id={`article-description-${article.article_id}`}
        className="article-info"
      >
        <p>
          <strong>Author:</strong>{" "}
          <span aria-label="Author">{article.author}</span>
        </p>
        <p>
          <strong>Topic:</strong>{" "}
          <span aria-label="Topic">{article.topic.toUpperCase()}</span>
        </p>
        <p>
          <strong>🗨️</strong>{" "}
          <span aria-label="Comment count">{article.comment_count}</span>
        </p>
        <p>
          <strong>Published:</strong>{" "}
          <span aria-label="Publication date">
            {new Date(article.created_at).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;
