import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as api from "../utils/api";
import {
  ArticleHeader,
  VoteSection,
  CommentForm,
  CommentsList,
  ErrorMessage,
 } from "../components";

type Props = {
  user: any;
  articles: any[];
};

function ArticleDetail({ user, articles }: Props) {
  const { article_id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
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
    if (!article_id) return;

    // ✅ First try to find it in existing articles
    const found = articles.find((a) => String(a.article_id) === String(article_id));
    if (found) {
      setArticle(found);
      setVotes(found.votes ?? 0);
      setLoadingArticle(false);
    } else {
      // ✅ Fallback: fetch from API if not found
      api.fetchArticleById(article_id)
        .then((fetched) => {
          if (!fetched) {
            setError("Article not found.");
            return;
          }
          setArticle(fetched);
          setVotes(fetched.votes ?? 0);
        })
        .catch(() => setError("Failed to load article."))
        .finally(() => setLoadingArticle(false));
    }

    // ✅ Always fetch comments fresh (not in App state yet)
    api.fetchCommentsByArticleId(article_id)
      .then((fetched) => setComments(fetched || []))
      .catch(() => setError("Failed to load comments."))
      .finally(() => setLoadingComments(false));

    if (localStorage.getItem(`hasVoted_${article_id}`)) setHasVoted(true);
  }, [article_id, articles]);

  // Voting logic
  const handleVote = (delta: number) => {
    if (hasVoted || votes + delta < 0) return;
    setVotes((v) => v + delta);
    setHasVoted(true);
    localStorage.setItem(`hasVoted_${article_id}`, "true");

    api.voteOnArticle(article_id!, delta).catch(() => {
      setVotes((v) => v - delta);
      setHasVoted(false);
      setError("Failed to update vote. Please try again.");
    }).finally(() => setHasVoted(false));
  };

  const handleCommentPosted = (newComment: any) => {
    setComments((prev) => [newComment, ...prev]);
    setCommentSuccess("Comment posted successfully!");
  };

  const handleDeleteComment = (comment_id: string) => {
    setDeletingCommentId(comment_id);
    setDeleteMessage("");

    api.deleteComment(comment_id)
      .then(() => {
        setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
        setDeleteMessage("Comment deleted successfully.");
      })
      .catch(() => {
        setDeleteMessage("Failed to delete comment.");
        setError("Failed to delete comment.");
      })
      .finally(() => setDeletingCommentId(null));
  };

  // Render
  if (loadingArticle) return <p>Loading article...</p>;
  if (error) return <ErrorMessage message={error} />;
  if (!article) return <p>Article not found.</p>;

  const readingTime = calculateReadingTime(article.body);

  return (
    <div className="max-w-[800px] mx-auto p-5">
      <ArticleHeader article={article} />

      {readingTime && (
        <p className="text-sm text-gray-500 mt-2 italic">
          ⏱ Estimated reading time: {readingTime}
        </p>
      )}

      <VoteSection votes={votes} handleVote={handleVote} hasVoted={hasVoted} error={error} />

      <CommentForm articleId={article_id!} currentUser={user} onCommentPosted={handleCommentPosted} />

      {commentSuccess && (
        <p className="text-nc-success mt-2">{commentSuccess}</p>
      )}

      <CommentsList
        comments={comments}
        loadingComments={loadingComments}
        deletingCommentId={deletingCommentId}
        handleDeleteComment={handleDeleteComment}
        deleteMessage={deleteMessage}
      />
    </div>
  );
}

export default ArticleDetail;