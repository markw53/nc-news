import React from "react";
import { Link } from "react-router-dom";

function ArticlesList({ articles }) {
  return (
    <div className="articles-list">
      {articles.map((article) => (
        <div key={article.article_id} className="article-card">
          <Link to={`/articles/${article.article_id}`}>
            <img src={article.article_img_url} alt={article.title} />
            <h2>{article.title}</h2>
          </Link>
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
