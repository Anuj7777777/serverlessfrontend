import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { fetchPosts } from '../utils/api';
import '../styles/post.css';

const PostList = () => {
  const { username } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          {/* Cover Image */}
          {post.coverImageUrl && (
            <img 
              src={post.coverImageUrl} 
              alt="Post Cover" 
              className="post-cover" 
            />
          )}

          <div className="post-content">
            <h2>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="post-meta">
              <span>Posted by: {post.author || 'Unknown'}</span>
              {post.author === username && (
                <span className="your-post-badge">(Your post)</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
