import React from 'react';
import ArticleCard from './ArticleCard';

function ArticlesList({ articles }) {
    return (
        <div className='"articles-list'>
            {articles.length ? (
                articles.map((article) => (
                    <ArticleCard
                        key={article.title}
                        title={article.title}
                        topic={article.topic}
                        author={article.author}
                        votes={article.votes}
                        commentCount={article.commentCount}
                        imageUrl={article.article_img_url}
                    />
                ))
            ) : (
                <p>No articles available</p>
            )}
        </div>
    );
}

export default ArticlesList;