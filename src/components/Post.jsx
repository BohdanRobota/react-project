import React from 'react';
import MyButton from './UI/button/MyButton';
import {useNavigate} from 'react-router-dom';

function Post({ post, number, remove }) {
  const router = useNavigate();
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {post.id} {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => {remove(post)}}>Delete</MyButton>
        <MyButton onClick={() => {router(`/posts/${post.id}`)}}>Open</MyButton>
      </div>
    </div>
  );
}

export default Post;
