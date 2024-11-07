import React, { useState } from "react";
import { postComment } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import "../App.css";

function CommentForm({ articleId, onCommentPosted }) {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentBody.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      const newComment = await postComment(articleId, commentBody);
      onCommentPosted(newComment);
      setCommentBody("");
      setError("");
    } catch (error) {
      setError("Failed to post comment. Please try again.");
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
        />

        <button
          type="submit"
          className="submit-button"
          aria-label="Post Comment"
        >
          Post Comment
        </button>
      </form>

      <ErrorMessage message={error} />
    </section>
  );
}

export default CommentForm;
