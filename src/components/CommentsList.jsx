function CommentsList({ comments, loadingComments, deletingCommentId, handleDeleteComment, deleteMessage }) {
    return (
      <div className="comments-section">
        <h3>Comments</h3>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
          <div className="comments-grid">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.comment_id} className="comment-card">
                  <p>
                    <strong>{comment.author}</strong> <span>{new Date(comment.created_at).toLocaleString()}</span>
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
              <p>No comments yet.</p>
            )}
            {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
          </div>
        )}
      </div>
    );
  }
  
  export default CommentsList;
  