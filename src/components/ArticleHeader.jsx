function ArticleHeader({ article }) {
    return (
      <div className="article-detail">
        <h2>
          {article.title} <span>{new Date(article.created_at).toLocaleString()}</span>
        </h2>
        <img src={article.article_img_url} alt={article.title} />
        <p>{article.body}</p>
        <p>Author: {article.author}</p>
      </div>
    );
  }
  
  export default ArticleHeader;
  