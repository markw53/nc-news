function ArticleHeader({ article }) {
  // Defensive formatting for created_at (Firestore Timestamp or ISO string)
  let formattedDate = "Unknown date";
  let dateTimeAttr = "";
  if (article?.created_at) {
    try {
      const dateValue =
        article.created_at.seconds !== undefined
          ? new Date(article.created_at.seconds * 1000) // Firestore Timestamp
          : new Date(article.created_at);              // ISO string
      formattedDate = dateValue.toLocaleString();
      dateTimeAttr = dateValue.toISOString();
    } catch {
      formattedDate = "Invalid date";
    }
  }

  return (
    <article
      className="article-detail"
      aria-labelledby={`article-title-${article.article_id}`}
      aria-describedby={`article-author-${article.article_id} article-body-${article.article_id}`}
    >
      <header>
        <h2 id={`article-title-${article.article_id}`}>
          {article.title || "Untitled Article"}
          {article.created_at && (
            <time dateTime={dateTimeAttr} aria-label="Published date">
              {" "}
              {formattedDate}
            </time>
          )}
        </h2>
      </header>

      <figure>
        <img
          src={
            article.article_img_url ||
            "https://via.placeholder.com/700?text=No+Image"
          }
          alt={`Image for article titled ${article.title || "Untitled"}`}
          className="thumbnail"
        />
      </figure>

      <section id={`article-body-${article.article_id}`}>
        <p>{article.body || "No content available for this article."}</p>
      </section>

      <footer>
        <p
          id={`article-author-${article.article_id}`}
          aria-label="Article author"
        >
          <strong>Author:</strong> {article.author || "Unknown"}
        </p>
      </footer>
    </article>
  );
}

export default ArticleHeader;