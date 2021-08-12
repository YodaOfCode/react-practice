import React from 'react';
import Button from "./UI/button/Button";

const PostItem = ({post, number, remove}) => {
    return (
        <div className='post'>
            <div className='post__content'>
                <strong>{post.id}</strong>
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
            </div>
            <div className='root_btns'>
                <Button onClick={() => remove(post)}>Удалить</Button>
            </div>
        </div>
    );
};

export default PostItem;