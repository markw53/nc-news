import React, { useState } from "react";
import * as api from "../utils/api";
import ErrorMessage from "./ErrorMessage";

function CommentForm({ articleId, currentUser, onCommentPosted }) {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentBody.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    if (!currentUser) {
      setError("You must be logged in to post a comment.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newComment = await api.postComment(
        articleId,
        commentBody,
        currentUser.username // ✅ FIX: use logged-in user's username
      );
      onCommentPosted(newComment);
      setCommentBody("");
      setError("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      setError(
        err.response?.data?.msg || // ✅ your backend uses { msg }
        err.response?.data?.message ||
        "Failed to post comment. Please try again"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="comment-form-title">
      <h2 id="comment-form-title" className="visually-hidden">
        Post a Comment
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col items-center w-4/5 max-w-[600px] mx-auto mt-4">
  <textarea
    value={commentBody}
    onChange={(e) => setCommentBody(e.target.value)}
    placeholder="Write your comment..."
    className="w-full p-2 mb-2 border border-gray-300 rounded resize-y text-base"
    required
  />
  <button
    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 disabled:bg-gray-400"
    disabled={isSubmitting || !commentBody.trim()}
  >
    {isSubmitting ? "Posting..." : "Post Comment"}
  </button>
  {error && <p className="text-red-600 mt-2">{error}</p>}
</form>

      {error && <ErrorMessage message={error} />}
    </section>
  );
}

export default CommentForm;