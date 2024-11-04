import React from "react";

function ArticlesList({ articles }) {
  return (
    <div className="articles-list">
      {articles.map((article) => (
        <div key={article.title} className="article-card">
          <img src={article.article_img_url} alt={article.title} />
          <h2>{article.title}</h2>
          <p>{article.topic}</p>
          <p>Author: {article.author}</p>
          <p>{article.body.slice(0, 100)}...</p>
          <p>Comments: {article.comment_count}</p>
          <p>Votes: {article.votes}</p>
          <p>Created at: {new Date(article.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default ArticlesList;
