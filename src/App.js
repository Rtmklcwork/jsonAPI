
import React, { useEffect, useState } from "react";
import PostService from "./API/PostService.js";
import PostFilter from "./components/PostFilter.jsx";
import PostForm from "./components/PostForm.jsx";
import PostList from "./components/PostList.jsx";
import { useFetch } from "./hooks/useFetch.jsx";
import { usePosts } from "./hooks/usePosts.jsx";
import './styles/App.css'
import MyLoader from "./UI/button/loader/MyLoader.jsx";
import MyModal from "./UI/button/modal/MyModal.jsx";
import MyButton from "./UI/button/MyButton.jsx";
import { getPageCount, getPagesArray } from "./utils/pages.js";




function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)


  const [fetchPosts, isPostsLoading, postError] = useFetch(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  })


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const searchedAndSortedPosts = usePosts(posts, filter.sort, filter.query)

  const [modal, setModal] = useState('')


  useEffect(() => {
    fetchPosts()
  }, [])
  let pagesArray = getPagesArray(totalPages)
  console.log(pagesArray);
  return (
    <>

      <div className="App">


        <MyButton
          style={{ marginTop: 30 }}
          onClick={() => setModal(true)} >
          Создать пост
        </MyButton>

        <MyModal visible={modal} setVisible={setModal}>
          <PostForm
            create={createPost} />
        </MyModal>

        <hr style={{ margin: '15px 0' }} />

        <PostFilter
          filter={filter}
          setFilter={setFilter}
        />
        {postError &&
          <h1>Произошла ошибка {postError}</h1>}

        {isPostsLoading
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><MyLoader /></div>
          : <PostList remove={removePost} posts={searchedAndSortedPosts} title="Посты про JS" />
        }
        <div className="page__wrapper">
          {pagesArray.map(p =>
            <span
              key={p}
              onClick={() => setPage(p)}
              className={page === p ? 'page page__current' : 'page'}>{p}</span>
          )}
        </div>


      </div >
    </>
  );
}

export default App;
