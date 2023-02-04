import React from 'react';
import c from './savesPosts.module.scss';
import PostsSaveComp from "./comp/postsSaveComp";
import {useSelector} from "react-redux";
import PostsSaveComp2 from "./comp/PostsSaveComp2";

const SavesPosts = ({s}) => {
    const subPosts = useSelector(state => state.allState.subPosts);

    const sM = subPosts.map(si => (
        <PostsSaveComp2 si={si} save={s}/>
    ))
    return (
        <div className={c.cardsCon}>
            {sM}
        </div>
    );
};

export default SavesPosts;