import React, { useState } from 'react';
import { postComment } from '../utils/api';
import ErrorMessage from './ErrorMessage';
import '../App.css';

function CommentForm({ articleId, onCommentPosted }) {
    const [commentBody, setCommentBody] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!commentBody.trim()) {
            setError('Comment cannot be empty.');
            return;
        }

        try {
            const newComment = await postComment(articleId, commentBody);
            onCommentPosted(newComment);  
            setCommentBody('');           
            setError('');          
        } catch (error) {
            setError("Failed to post comment. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='comment-form'>
                <textarea
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="Write your comment here..."
                    required
                    className='comment-textarea'
                />
                <button type="submit" className='submit-button'>Post Comment</button>
            </form>
            <ErrorMessage message={error} />
        </div>
    );
}

export default CommentForm;
