import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../utils/api";

function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      });

    fetchCommentsByArticleId(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setLoadingComments(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoadingComments(false);
      });
  }, [article_id]);

  if (!article) return <p>Loading...</p>;
  if (loadingComments) return <p>Loading comments...</p>;

  return (
    <div className="article-detail-container">
      <header>
        <h1>Article Detail</h1>
      </header>
      <div className="article-detail">
        <h2>
           {article.title}{" "}
           <span>{new Date(article.created_at).toLocaleString()}</span>
        </h2>
        <img src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
        <p>Author: {article.author}</p>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <div className="comments-grid">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.comment_id} className="comment-card">
                <p>
                  <strong>{comment.author}</strong>{" "}
                  <span>{new Date(comment.created_at).toLocaleString()}</span>
                </p>
                <p>{comment.body}</p>
                <p>Votes: {comment.votes}</p>
              </div>
            ))
          ) : (
            <p>Mo comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
