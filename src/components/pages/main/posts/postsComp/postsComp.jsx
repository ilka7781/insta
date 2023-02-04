import React, {useEffect} from 'react';
import {BiDotsHorizontalRounded} from "@react-icons/all-files/bi/BiDotsHorizontalRounded";
import {AiFillHeart} from "@react-icons/all-files/ai/AiFillHeart";
import {FaRegComment} from "@react-icons/all-files/fa/FaRegComment";
import {BsBookmark} from "@react-icons/all-files/bs/BsBookmark";
import c from './postsComp.module.scss';
import {useDispatch, useSelector} from "react-redux";
import noProfile from "../../../../../img/1.jpg";
import {API} from "../../../../redux/api";
import {BsFillBookmarkFill} from "@react-icons/all-files/bs/BsFillBookmarkFill";
import {selectedPost, selectedUserAction} from "../../../../redux/reducers";
import {Link} from "react-router-dom";

const PostsComp = ({p}) => {
    const user = useSelector(state => state.allState.user);
    const users = useSelector(state => state.allState.users);
    const usersFiltered = users.filter(u => u.id === p.user);
    const subPosts = useSelector(state => state.allState.subPosts);
    const base = 'https://cryxxxen.pythonanywhere.com/';
    const accessToken = localStorage.getItem('accessToken');

    //SAVES
    const saves = useSelector(state => state.allState.saves);

    const selectPost =() => {
        dispatch(selectedPost(p));
    }

    const subPostsF= subPosts.filter(s => s.length > 0);

    const dispatch= useDispatch();

    const selectUser = (fi) => {
        dispatch(selectedUserAction(fi));
        API.getSelectedUserPosts(fi.id);
    }
    //SAVE
    const savePost =()=>{
        API.postSave(p.id,accessToken);
    }

    //LIKE
    const postLike = () => {
        API.postLike(accessToken, p.id, usersFiltered);
    }
    return (
            <div key={p.id} className={c.pCards}>
                <div className={c.userPost_header}>
                    <div>
                        {usersFiltered.map(u=> (
                                u.avatar?.length > 1 ? (
                                    <Link to={'/profileDetail'}>
                                        <img onClick={()=> selectUser(u)} className={c.img} src={u.avatar} alt="#"/>
                                    </Link>
                                ) : (
                                    <Link  to={'/profileDetail'}>
                                        <img  onClick={()=> selectUser(u)} className={c.img} src={noProfile} alt="#"/>
                                    </Link>
                                )
                        ))}
                        <span>
                        {usersFiltered.map(u => (
                            <span className={c.userName}  onClick={()=> selectUser(u)}>
                            <Link  to={'/profileDetail'}>
                                 {u.username}
                            </Link>
                            </span>
                        ))}
                       </span>
                    </div>
                    <BiDotsHorizontalRounded/>
                </div>

                <div className={c.userPost_img}  onClick={selectPost}>
                    <Link to={'/postDetail'}>
                        {
                            p?.post_images[0]?.image ? (

                                <img className={c.imgPost} src={`${base}${p.post_images[0]?.image}`} alt="#"/>

                            ) : (
                                <div className={c.noImage}>
                                    <h1>no image</h1>
                                </div>
                            )
                        }
                    </Link>

                    <div className={c.userPost_img_signs}>
                        <div className={c.userPost_img_signs_heart}>
                            <div>
                                <AiFillHeart className={c.likeBtn} onClick={postLike}/>
                                <span className={c.liked}>
                                  {p.liked.length}
                                </span>
                            </div>
                            <FaRegComment/>
                        </div>
                        <BsBookmark onClick={savePost}/>
                    </div>
                    <div className={c.userPost_img_footer}>
                        <span>
                            {
                                usersFiltered.map(u=> (
                                    <span className={c.userPost_img_footer_boldS}>
                                        {u.username}
                                    </span>
                                ))
                            }
                        </span>
                        <span>
                            {
                                p.title
                            }
                        </span>
                    </div>

                </div>
                <div className={c.userPost_comments}>

                </div>

            </div>
    );
};

export default PostsComp;