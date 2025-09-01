function ArticleHeader({ article }) {
  // Utility to parse Firestore Timestamp or ISO String
  const formatDate = (input) => {
    try {
      const d = input?.seconds
        ? new Date(input.seconds * 1000)
        : new Date(input);
      return { display: d.toLocaleString(), iso: d.toISOString() };
    } catch {
      return { display: "Invalid date", iso: "" };
    }
  };

  const { display, iso } = article?.created_at
    ? formatDate(article.created_at)
    : { display: "Unknown date", iso: "" };

  return (
    <article
      className="max-w-[800px] mx-auto p-5"
      aria-labelledby={`article-title-${article?.article_id}`}
      aria-describedby={`article-author-${article?.article_id} article-body-${article?.article_id}`}
    >
      {/* Title + Date */}
      <header className="mb-4">
        <h2
          id={`article-title-${article?.article_id}`}
          className="text-2xl font-heading text-nc-secondary"
        >
          {article?.title || "Untitled Article"}
        </h2>
        {article?.created_at && (
          <time
            dateTime={iso}
            aria-label="Published date"
            className="block text-sm text-gray-500"
          >
            {display}
          </time>
        )}
      </header>

      {/* Article Image */}
      <figure className="mb-4">
        <img
          src={
            article?.article_img_url ||
            "https://via.placeholder.com/700?text=No+Image"
          }
          alt={`Image for article titled ${article?.title || "Untitled"}`}
          className="w-full max-h-[400px] object-cover rounded shadow-card"
        />
        <figcaption className="sr-only">
          Cover image for {article?.title || "this article"}
        </figcaption>
      </figure>

      {/* Body Copy */}
      <section id={`article-body-${article?.article_id}`} className="mb-6">
        <p className="text-lg text-nc-dark leading-relaxed">
          {article?.body || "No content available for this article."}
        </p>
      </section>

      {/* Footer Author */}
      <footer>
        <p
          id={`article-author-${article?.article_id}`}
          aria-label="Article author"
          className="text-sm text-nc-secondary"
        >
          <strong>Author:</strong> {article?.author || "Unknown"}
        </p>
      </footer>
    </article>
  );
}

export default ArticleHeader;