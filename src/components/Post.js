import React from "react";

const Post = ({ post }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{post.title}</h2>

      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt="Post cover"
          style={styles.image}
        />
      )}

      <p style={styles.content}>{post.content}</p>

      <small style={styles.meta}>
        {post.createdAt
          ? new Date(post.createdAt).toLocaleString()
          : "No timestamp"}
        {" · "}
        {post.author ? `Posted by: ${post.author}` : ""}
      </small>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "20px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "1.5rem",
  },
  content: {
    margin: "10px 0",
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  meta: {
    color: "#666",
    fontSize: "0.85rem",
  },
};

export default Post;
