import React, { useState } from "react";
import { createPost } from "../utils/api";

const PostForm = ({ token, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content }, token, image);
      alert("Post created!");
      setTitle("");
      setContent("");
      setImage(null);
      setPreview(null);
      if (onCancel) onCancel(); // Hide form
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: "100px" }} />
      )}
      <div style={{ marginTop: "10px" }}>
        <button type="submit">Create Post</button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
