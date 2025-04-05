import React from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../components/PostDetail';

const PostPage = () => {
  const { id } = useParams();

  return (
    <div className="post-page">
      <PostDetail id={id} />
    </div>
  );
};

export default PostPage;