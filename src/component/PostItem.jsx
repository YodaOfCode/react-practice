import React from 'react';
import Button from "./UI/button/Button";
import {useHistory} from "react-router-dom";

const PostItem = ({post, number, remove, id}) => {
    const router = useHistory()

    return (
        <div className='post'>
            <div className='post__content'>
                <strong>{post.id}</strong>
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
            </div>
            <div className='app__btns'>
            <div className='root_btns'>
                <Button onClick={() => router.push(`/posts/${number}`)}>Открыть</Button>
            </div>
            <div className='root_btns'>
                <Button onClick={() => remove(post)}>Удалить</Button>
            </div>
            </div>
        </div>
    );
};

export default PostItem;