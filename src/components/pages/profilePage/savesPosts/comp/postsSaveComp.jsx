import React, {useState} from 'react';
import c from './postsSaveComp.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectedPost} from "../../../../redux/reducers";
import PostsSaveComp2 from "./PostsSaveComp2";

const PostsSaveComp = ({save}) => {
    const subPosts = useSelector(state => state.allState.subPosts);


    const sM = subPosts.map(s => (
        <PostsSaveComp2 s={s} save={save}/>
    ))



    return (
        <div >
            {sM}
        </div>
    );
};

export default PostsSaveComp;