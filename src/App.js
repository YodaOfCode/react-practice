import React, {useEffect, useState} from "react";
import './App.css';
import PostList from "./component/PostList";
import PostForm from "./component/PostForm";
import PostFilter from "./component/PostFilter";
import Modal from "./component/UI/modal/Modal";
import Button from "./component/UI/button/Button";
import {useSortedPosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Preloader from "./component/UI/preloader/Preloader";
import {useFetching} from "./hooks/useFetching";
import {getPageCount, getPagesArray} from "./utils/pages";
import Pagination from "./component/UI/pagination/Pagination";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = useSortedPosts(posts, filter.sort, filter.query);
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    // Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    useEffect(() => {
        fetchPosts()
    }, [page])

    return (
        <div className="App">
            <Button onClick={fetchPosts}>Взять посты</Button>
            <Button style={{marginTop: '20px'}} onClick={() => setModal(true)}>Создать новую запись</Button>
            <Modal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </Modal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError && <h1>Произошла ошибка ${postError}</h1>}
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Preloader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов 1'/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default App;
