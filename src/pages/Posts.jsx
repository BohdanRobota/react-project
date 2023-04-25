import React, { useState, useMemo, useEffect } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal.jsx';
import Loader from '../components/UI/Loader/Loader';
import PostService from '../API/PostService';
import Pagination from '../components/UI/pagination/Pagination';
import { getPageCount } from '../utils/pages';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { usePagination } from '../hooks/usePagination';
import '../styles/App.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  let pagesArray = usePagination(totalPages);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => post.id !== p.id));
  };

  const changePage = (page) => {
    fetchPosts(limit, page);
    setPage(page);
  };

  return (
    <div>
      <MyButton style={{ marginTop: '30px' }} onClick={(e) => setModal(true)}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1 style={{ textAlign: 'center' }}>Error ${postError}</h1>}
      {isPostLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Loader />
        </div>
      ) : (
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts List" />
      )}
      <Pagination totalPages={totalPages} changePage={changePage} page={page}/>
    </div>
  );
}

export default Posts;
