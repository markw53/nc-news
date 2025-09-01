function CommentsList({ comments, loadingComments, deletingCommentId, handleDeleteComment }) {
  return (
    <section className="mt-5 pt-2 border-t border-gray-300">
      <h3 className="text-xl font-semibold mb-3">Comments</h3>
      {loadingComments ? (
        <p>Loading comments...</p>
      ) : (
        <div className="grid gap-5 mt-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {comments.length > 0 ? (
            comments.map((c) => (
              <article
                key={c.comment_id}
                className="border border-gray-300 p-3 rounded bg-gray-50 shadow-sm"
              >
                <header className="mb-2">
                  <strong>{c.author || "Unknown"}</strong>
                  <time className="block text-xs text-gray-500">
                    {new Date(
                      c.created_at?.seconds
                        ? c.created_at.seconds * 1000
                        : c.created_at
                    ).toLocaleString()}
                  </time>
                </header>
                <p>{c.body}</p>
                <p className="text-sm">👍 {c.votes ?? 0}</p>
                <button
                  disabled={deletingCommentId === c.comment_id}
                  onClick={() => handleDeleteComment(c.comment_id)}
                  className="mt-2 px-3 py-1 bg-nc-danger text-white rounded hover:bg-nc-secondary disabled:opacity-50"
                >
                  {deletingCommentId === c.comment_id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </article>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default CommentsList;