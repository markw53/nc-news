function ArticleHeader({ article }) {
  return (
    <article
      className="article-detail"
      aria-labelledby="article-title"
      aria-describedby="article-author article-body"
    >
      <header>
        <h2 id="article-title">
          {article.title}
          <time dateTime={article.created_at} aria-label="Published date">
            {new Date(article.created_at).toLocaleString()}
          </time>
        </h2>
      </header>

      <figure>
        <img
          src={article.article_img_url}
          alt={`Image for article titled ${article.title}`}
          className="article-image"
        />
      </figure>

      <section id="article-body">
        <p>{article.body}</p>
      </section>

      <footer>
        <p id="article-author" aria-label="Article author">
          <strong>Author:</strong> {article.author}
        </p>
      </footer>
    </article>
  );
}

export default ArticleHeader;
