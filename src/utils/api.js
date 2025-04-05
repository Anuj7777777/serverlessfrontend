// src/utils/api.js

const API_BASE_URL =" https://webblog-f7beb8c9hxdkgac7.centralindia-01.azurewebsites.net/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return response.json();
  
};

// POSTS
export const createPost = async (postData, token, imageFile) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  if (imageFile) formData.append("image", imageFile); // Field name must match multer

  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return handleResponse(response);
};

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  return handleResponse(response);
};

// Fetch posts (now includes image URLs)
export async function fetchPost(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return await response.json();
}





export const updatePost = async (id, postData, token) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return handleResponse(response);
};

export const deletePost = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// COMMENTS
export const fetchComments = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/comments/${postId}`);
  return handleResponse(response);
};

export const createComment = async (postId, commentData, token) => {
  const response = await fetch(`${API_BASE_URL}/comments/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });
  return handleResponse(response);
};

export const deleteComment = async (postId, commentId, token) => {
  const response = await fetch(`${API_BASE_URL}/comments/${postId}/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

// IMAGE UPLOAD
export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append("image", file); // Ensure correct field name

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  return handleResponse(response); // Returns { url: "https://..." }
};
