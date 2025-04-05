import React from 'react';
import PostList from '../components/PostList';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Serverless Blog</h1>
      <PostList />
    </div>
  );
};

export default Home;