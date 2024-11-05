import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <h2>{article.title}</h2>
      </Link>
      <img src={article.article_img_url} alt={article.title} className="article-image" />
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Topic:</strong> {article.topic}</p>
      <p><strong>Comments:</strong> {article.comment_count}</p>
      <p><strong>Published:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
    </div>
  );
}

export default ArticleCard;
