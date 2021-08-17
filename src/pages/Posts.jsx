import React, {useEffect, useRef, useState} from "react";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import Button from "../component/UI/button/Button";
import Modal from "../component/UI/modal/Modal";
import PostForm from "../component/PostForm";
import PostFilter from "../component/PostFilter";
import PostList from "../component/PostList";
import Pagination from "../component/UI/pagination/Pagination";
import Preloader from "../component/UI/preloader/Preloader";
import styles from './../App.css'
import {useObserver} from "../hooks/useObserver";
import Select from "../component/UI/select/Select";


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
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

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts()
    }, [page, limit])

    return (
        <div>
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
            <Select
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Количество элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'}
                ]}
            />
            {postError && <h1>Произошла ошибка ${postError}</h1>}
            {
                isPostsLoading && <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Preloader/>
                </div>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов 1'/>
            <div ref={lastElement} style={{height: '20px', background: 'red'}}/>
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
