import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../utils/api";
import ArticleHeader from "./ArticleHeader";
import VoteSection from "./VoteSection";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import ErrorMessage from "./ErrorMessage";

function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);
  const [submittedComments, setSubmittedComments] = useState(new Set());
  const [commentSuccess, setCommentSuccess] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  const calculateReadingTime = (content) => {
    const wordCount = content.split(" ").length;
    const readingTimeInSeconds = wordCount / 3; 
    const minutes = Math.floor(readingTimeInSeconds / 60);
    const seconds = Math.round(readingTimeInSeconds % 60);
    return `${minutes} min ${seconds} sec`;
  };

  useEffect(() => {
    api
      .fetchArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setVotes(fetchedArticle.votes);
        setLoadingArticle(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setError("Failed to load article. Please try again later.");
        setLoadingArticle(false);
      });

    api
      .fetchCommentsByArticleId(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setLoadingComments(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments. Please try again later.");
        setLoadingComments(false);
      });

    const storedVoteState = localStorage.getItem(`hasVoted_${article_id}`);
    if (storedVoteState) {
      setHasVoted(true);
    }
  }, [article_id]);

  const handleVote = (voteChange) => {
    if (hasVoted || votes + voteChange < 0) return;

    setVotes((prevVotes) => prevVotes + voteChange);
    setHasVoted(true);

    localStorage.setItem(`hasVoted_${article_id}`, true);

    api
      .voteOnArticle(article_id, voteChange)
      .then(() => setHasVoted(false))
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

    api
      .deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeleteMessage("Comment deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        setDeleteMessage("Failed to delete comment. Please try again.");
        setError("Failed to delete comment. Please try again.");
      })
      .finally(() => setDeletingCommentId(null));
  };

  const handleCommentPosted = (newComment) => {
    if (submittedComments.has(newComment.body.trim())) {
      setError("You have already posted this comment.");
      return;
    }

    setComments((prevComments) => [newComment, ...prevComments]);
    setCommentSuccess("Comment posted successfully!");
    setSubmittedComments((prev) => new Set(prev).add(newComment.body.trim()));
  };

  if (loadingArticle) return <p>Loading article...</p>;
  if (error) return <ErrorMessage message={error} aria-live="assertive" />;

  const readingTime = article ? calculateReadingTime(article.body) : null;

  return (
    <div
      className="article-detail-container"
      role="main"
      aria-labelledby="article-title"
    >
      <ArticleHeader article={article} />

      {readingTime && (
        <p className="reading-time" aria-live="polite">
          Estimated reading time: {readingTime}
        </p>
      )}

      <VoteSection
        votes={votes}
        handleVote={handleVote}
        hasVoted={hasVoted}
        error={error}
        aria-label="Vote section for the article"
        aria-live="polite"
      />

      <CommentForm
        articleId={article_id}
        article={article}
        onCommentPosted={handleCommentPosted}
        aria-label="Comment form"
      />

      {commentSuccess && (
        <p className="success-message" aria-live="polite">
          {commentSuccess}
        </p>
      )}

      <CommentsList
        comments={comments}
        loadingComments={loadingComments}
        deletingCommentId={deletingCommentId}
        handleDeleteComment={handleDeleteComment}
        deleteMessage={deleteMessage}
        aria-label="Comments section"
        aria-live="polite"
      />
    </div>
  );
}

export default ArticleDetail;
