import React from 'react';
import c from './postDetail.module.scss';
import {useSelector} from "react-redux";
import {BiDotsHorizontalRounded} from "@react-icons/all-files/bi/BiDotsHorizontalRounded";
import {AiFillHeart} from "@react-icons/all-files/ai/AiFillHeart";
import {BsBookmark} from "@react-icons/all-files/bs/BsBookmark";
import {FaRegComment} from "@react-icons/all-files/fa/FaRegComment";
import noProfile from '../../../../../img/1.jpg';
import {API} from "../../../../redux/api";

const PostDetail = () => {
    const sPost = useSelector(state => state.allState.selectedPost);
    const users = useSelector(state => state.allState.users);
    const selectedUser = users?.filter(u => u.id === sPost.user);
    const base = 'https://cryxxxen.pythonanywhere.com/';
    const accessToken = localStorage.getItem('accessToken');

    //SAVE
    const savePost =()=>{
        API.postSave(sPost.id,accessToken);
    }
    //LIKE
    const postLike = () => {
        API.postLike(accessToken, sPost.id, selectedUser);
    }
    return (
        <div className={c.container}>
            <div className={c.userPost}>
                <div className={c.userPost_header}>
                    <div>
                        <img src={selectedUser[0]?.avatar} alt="#"/>
                        <span>
                        {selectedUser[0]?.username}
                        </span>
                    </div>
                    <BiDotsHorizontalRounded/>
                </div>
                <div>
                    <hr/>
                </div>
                <div className={c.userPost_img}>
                    {
                        sPost.post_images[0] ? (
                            <img src={`${base}${sPost.post_images[0]?.image}`} alt="#"/>
                        ) : (
                            <img src={noProfile} alt="#"/>
                        )
                    }
                    <div className={c.userPost_img_signs}>
                        <div className={c.userPost_img_signs_heart}>
                            <div>
                                <AiFillHeart onClick={postLike}/>
                                <span className={c.liked}>
                                     {sPost.liked.length}
                                </span>
                            </div>
                            <FaRegComment/>
                        </div>
                        <BsBookmark  onClick={savePost}/>
                    </div>
                    <div className={c.userPost_img_footer}>
                        <span className={c.userPost_img_footer_boldS}>
                            {selectedUser[0]?.username}
                        </span>
                        <span>
                            {sPost.title}
                        </span>
                    </div>
                </div>
                <div className={c.userPost_comments}>

                </div>
            </div>
        </div>
    );
};

export default PostDetail;