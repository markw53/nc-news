import React, { useState } from 'react';
import { postComment } from '../utils/api';

function CommentForm({ articleId, onCommentPosted }) {
    const [commentBody, setCommentBody] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [submittedComments, setSubmittedComments] = useState(new Set());
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!commentBody.trim()) {
            setErrorMessage('Comment cannot be empty.');
            return;
        }

        if (submittedComments.has(commentBody.trim())) {
            setErrorMessage("You have already posted this comment.");
            return;
        }

        try {
            await postComment(articleId, commentBody);
            setSuccessMessage("Comment posted successfully!");
            setSubmittedComments((prev) => new Set(prev).add(commentBody.trim()));
            setCommentBody('');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage("Failed to post comment. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder='Write your comment here...'
                    rows="4"
                    required
                />
                <button type="submit">Post Comment</button>
            </form>
            {successMessage && <p className='success-message'>{successMessage}</p>}
            {successMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
    );
}

export default CommentForm;






}