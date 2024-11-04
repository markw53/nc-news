import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../utils/api";

function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      });
  }, [article_id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">
      <header>
        <h1>Article Detail</h1>
      </header>
      <h2>{article.title} <span>{new Date(article.created_at).toLocaleString()}</span></h2>
      <img src={article.article_img_url} alt={article.title} />
      <p>{article.body}</p>
      <p>Author: {article.author}</p>

      {/* Placeholder for comments section */}
      <div className="comments-section">
        <h3>Comments</h3>
        <p>View and post comments here...</p>
      </div>
    </div>
  );
}

export default ArticleDetail;
