import React, { useState } from "react";
import * as api from "../utils/api";
import ErrorMessage from "./ErrorMessage";

function CommentForm({ articleId, article, onCommentPosted }) {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newComment = await api.postComment(
        articleId,
        commentBody,
        article.author
      );
      onCommentPosted(newComment);
      setCommentBody("");
      setError("");
    } catch (error) {
      console.error("Failed to post comment.", error);
      setError(
        error.response?.data?.message ||
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

      <form
        onSubmit={handleSubmit}
        className="comment-form"
        aria-describedby="comment-instructions"
      >
        <label htmlFor="comment-body" className="visually-hidden">
          Comment
        </label>
        <p id="comment-instructions" className="visually-hidden">
          Write your comment in the textarea below. This field is required.
        </p>

        <textarea
          id="comment-body"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="Write your comment here..."
          required
          className="comment-textarea"
          aria-required="true"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          className="submit-button"
          aria-label="Post Comment"
          disabled={isSubmitting || !commentBody.trim()}
        >
          {isSubmitting ? "Posting.." : "Post Comment"}
        </button>
      </form>

      {error && <ErrorMessage message={error} />}
    </section>
  );
}

export default CommentForm;
