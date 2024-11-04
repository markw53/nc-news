import React from 'react';

function ArticleCard({ title, topic, author, votes, commentCount, imageUrl }) {
    return (
        <div className='article-card'>
            <img src={imageUrl} alt={title} />
            <h2>{title}</h2>
            <p><strong>Topic:</strong> {topic}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Votes:</strong> {votes}</p>
            <p><strong>Comments:</strong> {commentCount}</p>
        </div>
    );
}

export default ArticleCard;