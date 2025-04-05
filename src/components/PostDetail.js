import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { fetchPost, deletePost } from '../utils/api';
import CommentSection from './CommentSection';
import '../styles/post.css';

const PostDetail = () => {
  const { id } = useParams();
  const { token, username } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPost(id);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id, token);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  const isAuthor = post.author === username;

  return (
    <div className="post-detail">
      {/* Cover Image */}
      {post.coverImageUrl && (
        <img 
          src={post.coverImageUrl} 
          alt="Post Cover" 
          className="post-cover" 
        />
      )}

      <h1>{post.title}</h1>
      <div className="post-content">{post.content}</div>
      <div className="post-meta">
        <span>Posted by: {post.author || 'Unknown'}</span>
        {isAuthor && <span className="your-post-badge">(Your post)</span>}
      </div>

      {isAuthor && (
        <div className="post-actions">
          <button onClick={() => navigate(`/posts/${id}/edit`)}>Edit</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      )}

      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetail;
