import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import { useParams } from 'react-router-dom';
import Loader from '../components/UI/Loader/Loader';
import MyButton from '../components/UI/button/MyButton';

function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchCommentById, isCommentLoading, commentError] = useFetching(async (id) => {
    const response = await PostService.geCommentsByPostId(id);
    setComments(response.data);
  });

  const loadComments = () => {
    fetchCommentById(params.id);
  }

  useEffect(() => {
    fetchPostById(params.id);
  }, []);

  return (
    <div className="postIdPage">
      {
        isLoading 
        ? <Loader/>
        : <h1>{post.id}. {post.title}</h1>
      }
      <div>
      {
        isCommentLoading 
        ? <Loader/>
        : <div>
          {
            comments.map((comm) => (
              <div style={{marginTop:"30px"}} key={comm.id} >
                <h4>{comm.email}</h4>
                <h4>{comm.body}</h4>
              </div>
            ))
          }
        </div>
      }
      </div>
      <MyButton onClick={()=>{loadComments()}}>Show Comments</MyButton>
    </div>
  );
}

export default PostIdPage;
