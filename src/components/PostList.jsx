import React from 'react';
import Post from './Post';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function PostList({ posts, title, remove }) {
  if (!posts.length) {
    return <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Posts not found</h1>;
  }
  return (
    <div className="PostList">
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <Post remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default PostList;
