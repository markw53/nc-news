function CommentsList({
  comments,
  loadingComments,
  deletingCommentId,
  handleDeleteComment,
  deleteMessage
}) {
  return (
    <section className="comments-section" aria-labelledby="comments-title">
      <h3 id="comments-title">Comments</h3>

      {loadingComments ? (
        <p aria-live="polite">Loading comments...</p>
      ) : (
        <div className="comments-grid" aria-live="polite">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <article
                key={comment.comment_id}
                className="comment-card"
                aria-labelledby={`comment-${comment.comment_id}-author`}
              >
                <header>
                  <p id={`comment-${comment.comment_id}-author`}>
                    <strong>{comment.author}</strong>
                    <time dateTime={new Date(comment.created_at).toISOString()}>
                      {new Date(comment.created_at).toLocaleString()}
                    </time>
                  </p>
                </header>
                <p>{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                <button
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  disabled={deletingCommentId === comment.comment_id}
                  aria-label={
                    deletingCommentId === comment.comment_id
                      ? "Deleting comment"
                      : "Delete this comment"
                  }
                >
                  {deletingCommentId === comment.comment_id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </article>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          {deleteMessage && (
            <p className="delete-message" aria-live="polite">
              {deleteMessage}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default CommentsList;
