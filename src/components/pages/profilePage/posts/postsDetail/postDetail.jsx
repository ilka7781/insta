import React, {useState} from 'react';
import c from './postDetail.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {BiDotsHorizontalRounded} from "@react-icons/all-files/bi/BiDotsHorizontalRounded";
import {AiFillHeart} from "@react-icons/all-files/ai/AiFillHeart";
import {BsBookmark} from "@react-icons/all-files/bs/BsBookmark";
import {BsFillBookmarkFill} from "@react-icons/all-files/bs/BsFillBookmarkFill";
import {FaRegComment} from "@react-icons/all-files/fa/FaRegComment";
import noProfile from '../../../../../img/1.jpg';
import {API} from "../../../../redux/api";
import {Link} from "react-router-dom";
import {selectedUserAction} from "../../../../redux/reducers";

const PostDetail = () => {
    const sPost = useSelector(state => state.allState.selectedPost);
    const user = useSelector(state => state.allState.user);
    const users = useSelector(state => state.allState.users);
    const selectedUser = users?.filter(u => u.id === sPost.user);
    const base = 'https://cryxxxen.pythonanywhere.com/';
    const accessToken = sessionStorage.getItem('accessToken');
    const [open,setOpen] = useState(false);

    const dispatch= useDispatch();

    const selectUser = (fi) => {
        dispatch(selectedUserAction(fi));
        API.getSelectedUserPosts(fi[0]?.id);
    }

    //DELETE
    const deletePost = () => {
        API.deletePost(sPost.id, accessToken, user.id);
    }
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
                    <div onClick={()=>selectUser(selectedUser)}>
                        <Link className={c.userInfo} to={'/profileDetail'}>
                            <img src={selectedUser[0]?.avatar ? selectedUser[0]?.avatar : noProfile} alt="#"/>
                            <span>
                        {selectedUser[0]?.username}
                        </span>
                        </Link>
                    </div>
                    <BiDotsHorizontalRounded onClick={() => {
                        if (open === false) {
                            setOpen(true)
                        } else (
                            setOpen(false)
                        )
                    }}/>
                    <div className={open ? c.dotsDiv : `${c.dotsDiv} ${c.inActive}`}>
                        <ul>
                            <li onClick={postLike}>Лайкнуть</li>
                            <li onClick={savePost}>Сохранить</li>
                            <li className={ user.id === sPost.user ? c.li : `${c.li} ${c.inActive}`} onClick={deletePost}>Удалить</li>
                        </ul>
                    </div>
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