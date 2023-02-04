import React from 'react';
import c from './postsMain.module.scss';
import PostsComp from "./postsComp/postsComp";

const PostsMain = ({p}) => {

    const posts = p?.map(p => (
       <PostsComp p={p}/>
    ))

    return (
        <div className={c.postsCon}>
            {posts}
        </div>
    );
};

export default PostsMain;