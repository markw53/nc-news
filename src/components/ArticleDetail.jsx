import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, fetchCommentsByArticleId, voteOnArticle, postComment, deleteComment } from "../utils/api";

function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    fetchArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setVotes(fetchedArticle.votes);
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

  const handleVote = (voteChange) => {
    if (hasVoted) return;

    setVotes((prevVotes) => prevVotes + voteChange);
    setHasVoted(true);

    voteOnArticle(article_id, voteChange)
    .then(() => {
      setHasVoted(false);
    })
    .catch((error) => {
      setVotes((prevVotes) => prevVotes - voteChange);
      setHasVoted(false);
      setError("Failed to update vote. Please try again.");
    });
  };

  const handleDeleteComment = (comment_id) => {
    if (deletingCommentId) return;
    setDeletingCommentId(comment_id);
    setDeleteMessage("");

    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) => prevComments.filter((comment) => comment.somment_id !== comment_id));
        setDeleteMessage("Comment deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        setDeleteMessage("Failed to delete comment. Please try again.");
      })
      .finally(() => {
        setDeletingCommentId(null);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!newComment) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    const commentData = {
      body: newComment,
      author: "Current user"
    };

    postComment(article_id, commentData)
      .then((createdComment) => {
        setComments((prevComments) => [createdComment, ...prevComments]);
        setNewComment("");
        setCommentSuccess("Comment posted successfully!");
        setCommentError("");
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        setCommentError("Failed to post comment. Please try again.");
        setCommentSuccess("");
      });
  };

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

        <div className="vote-section">
          <p>Votes: {votes}</p>
          <button onClick={() => handleVote(1)} disabled={hasVoted}>Upvote</button>
          <button onClick={() => handleVote(-1)} disabled={hasVoted}>Downvote</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            required
            className="comment-textarea"
          />
          <button type="submit" className="submit-button">Post Comment</button>
          {commentError && <p className="error">{commentError}</p>}
          {commentSuccess && <p className="success">{commentSuccess}</p>}
        </form>

        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
        <div className="comments-grid">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.comment_id} className="comment-card">
                <p>
                  <strong>{comment.author}</strong>{" "}
                  <span>{new Date(comment.created_at).toLocaleString()}</span>
                </p>
                <p>{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                <button
                    onClick={() => handleDeleteComment(comment.comment_id)}
                    disabled={deletingCommentId === comment.comment_id}
                  >
                    {deletingCommentId === comment.comment_id ? "Deleting..." : "Delete"}
                  </button>
              </div>
            ))
          ) : (
            <p>Mo comments yet.</p>
          )}
        </div>
        )}
        {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      </div>
    </div>
  );
}

export default ArticleDetail;
