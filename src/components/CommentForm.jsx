import React, { useState } from 'react';
import { postComment } from '../utils/api';
import '../App.css';

function CommentForm({ articleId, onCommentPosted }) {
    const [commentBody, setCommentBody] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!commentBody.trim()) {
            setErrorMessage('Comment cannot be empty.');
            return;
        }

        try {
            const newComment = await postComment(articleId, commentBody);
            onCommentPosted(newComment);  
            setCommentBody('');           
            setErrorMessage('');          
        } catch (error) {
            setErrorMessage("Failed to post comment. Please try again.");
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default CommentForm;
