import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { fetchPosts } from "../utils/api";
import PostForm from "../components/PostForm";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { token, username } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data.filter((post) => post.author === username));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [token, username, navigate]);

  if (!token) return null;
  if (loading) return <div>Loading your posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>
      <button onClick={() => setShowForm(true)} className="new-post-button">
        Create New Post
      </button>

      {showForm && (
        <div className="post-form-container">
          <PostForm token={token} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <h2>Your Posts</h2>
      {posts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        <div className="user-posts">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <div className="post-actions">
                <button onClick={() => navigate(`/posts/${post.id}`)}>
                  View
                </button>
                <button onClick={() => navigate(`/posts/${post.id}/edit`)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
