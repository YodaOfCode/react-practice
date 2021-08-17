import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Preloader from "../component/UI/preloader/Preloader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchComments, isCommentLoading, commentError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])


    return (
        <div>
            <h1>Вы открыли страницу поста c ID {params.id}</h1>
            {
                isLoading
                    ? <Preloader/>
                    : <div>{post.id} {post.title}</div>
            }
            <h2>Comments</h2>
            {
                isCommentLoading
                    ? <Preloader/>
                    : <div>
                        {comments.map(comment => (
                            <div style={{margin: '20px'}}>
                                <h5>{comment.email}</h5>
                                <p>{comment.name}</p>
                                <p>{comment.body}</p>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default PostIdPage;