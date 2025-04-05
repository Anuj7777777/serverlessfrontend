import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/auth';
import { fetchComments, createComment, deleteComment } from '../utils/api';
import '../styles/post.css';

const CommentSection = ({ postId }) => {
  const { token, username } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(postId);
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const createdComment = await createComment(
        postId,
        { text: newComment, author: username },
        token
      );
      setComments([...comments, createdComment]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(postId, commentId, token);
        setComments(comments.filter(comment => comment.id !== commentId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>

      {token && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      )}

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-content">{comment.text}</div>
            <div className="comment-meta">
              <span>By: {comment.author}</span>
              {comment.author === username && (
                <button 
                  onClick={() => handleDelete(comment.id)}
                  className="delete-comment"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;