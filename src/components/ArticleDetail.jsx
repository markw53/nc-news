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

  const calculateReadingTime = (content = "") => {
    if (!content) return null;
    const wordCount = content.split(/\s+/).length;
    const readingTimeInSeconds = wordCount / 3; // ~3 words/sec
    const minutes = Math.floor(readingTimeInSeconds / 60);
    const seconds = Math.round(readingTimeInSeconds % 60);
    return `${minutes} min ${seconds} sec`;
  };

  useEffect(() => {
    // Fetch article
    api
      .fetchArticleById(article_id)
      .then((fetchedArticle) => {
        if (!fetchedArticle) {
          setError("Article not found.");
          setLoadingArticle(false);
          return;
        }
        setArticle({
          ...fetchedArticle,
          votes: fetchedArticle.votes ?? 0,
          comment_count: fetchedArticle.comment_count ?? 0,
        });
        setVotes(fetchedArticle.votes ?? 0);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        setError("Failed to load article. Please try again later.");
      })
      .finally(() => setLoadingArticle(false));

    // Fetch comments
    api
      .fetchCommentsByArticleId(article_id)
      .then((fetchedComments = []) => {
        setComments(fetchedComments || []);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setError("Failed to load comments. Please try again later.");
      })
      .finally(() => setLoadingComments(false));

    // Has user voted?
    const storedVoteState = localStorage.getItem(`hasVoted_${article_id}`);
    if (storedVoteState) setHasVoted(true);
  }, [article_id]);

  const handleVote = (voteChange) => {
    if (hasVoted || votes + voteChange < 0) return;

    setVotes((prev) => prev + voteChange);
    setHasVoted(true);

    localStorage.setItem(`hasVoted_${article_id}`, true);

    api
      .voteOnArticle(article_id, voteChange)
      .then((updatedArticle) => {
        setVotes(updatedArticle?.votes ?? (votes + voteChange));
        setHasVoted(false);
      })
      .catch((err) => {
        console.error("Error casting vote:", err);
        setVotes((prev) => prev - voteChange);
        setHasVoted(false);
        setError("Failed to update vote. Please try again.");
      });
  };

  const handleDeleteComment = (comment_id) => {
    if (deletingCommentId) return; // prevent duplicate calls

    setDeletingCommentId(comment_id);
    setDeleteMessage("");

    api
      .deleteComment(comment_id)
      .then(() => {
        setComments((prev) =>
          prev.filter((c) => c.comment_id !== comment_id)
        );
        setDeleteMessage("Comment deleted successfully.");
      })
      .catch((err) => {
        console.error("Error deleting comment:", err);
        setDeleteMessage("Failed to delete comment. Please try again.");
        setError("Failed to delete comment. Please try again.");
      })
      .finally(() => setDeletingCommentId(null));
  };

  const handleCommentPosted = (newComment) => {
    const trimmedBody = newComment?.body?.trim();
    if (!trimmedBody) return;

    if (submittedComments.has(trimmedBody)) {
      setError("You have already posted this comment.");
      return;
    }

    setComments((prev) => [newComment, ...prev]);
    setCommentSuccess("Comment posted successfully!");
    setSubmittedComments((prev) => new Set(prev).add(trimmedBody));
  };

  if (loadingArticle) return <p>Loading article...</p>;
  if (error) return <ErrorMessage message={error} aria-live="assertive" />;
  if (!article) return <p>Article not found.</p>;

  const readingTime = calculateReadingTime(article.body);

  return (
    <div
      className="article-detail-container"
      role="main"
      aria-labelledby={`article-title-${article.article_id}`}
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