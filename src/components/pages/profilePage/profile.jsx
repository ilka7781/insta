import React, {useEffect, useState} from 'react';
import c from './profile.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {BsGrid3X3} from "@react-icons/all-files/bs/BsGrid3X3";
import {BsBookmark} from "@react-icons/all-files/bs/BsBookmark";
import {CgProfile} from "@react-icons/all-files/cg/CgProfile";
import {API} from "../../redux/api";
import {MdOutlineImageNotSupported} from "react-icons/md";
import Posts from "./posts/posts";
import SavesPosts from "./savesPosts/savesPosts";

const Profile = () => {
    const dispatch= useDispatch();
    const user = useSelector(state => state.allState.user);
    const userPosts = useSelector(state => state.allState.userPosts);
    const saveS = useSelector(state => state.allState.saves);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const [posts, setPosts] = useState(true);
    const [saves, setSaves] = useState(false);

    const savesMapped = saveS.map(s=>(
        <SavesPosts s={s}/>
    ))

    useEffect(()=>{
        if (user.length < 1){
            API.verifyUser(accessToken);
        }
    },[user.length])

    return (
        <div className={c.container}>
            <div className={c.profile}>
                <div className={c.profile_img}>
                    <img className={c.img} src={user.avatar} alt="#"/>
                </div>
                <div className={c.profile_info}>
                    <div className={c.profile_info_head}>
                        <span>
                            {user.username}
                        </span>
                        <button className={c.button} onClick={() => navigate('/profileEdit')}>
                            Редактировать профиль
                        </button>
                    </div>
                    <div className={c.profile_info_body}>
                        <ul>
                            <li className={c.bio}>
                                {user.bio}
                            </li>
                        </ul>
                        <ul>
                            <li>
                               <span className={c.bold}>{user.subscriptions ? user.subscriptions : 0 }</span>  подписок
                            </li>
                            <li>
                               <span className={c.bold}>{user.subscribers ? user.subscribers : 0}</span>  подписчиков
                            </li>
                            <li>
                               <span className={c.bold}>{userPosts.length}</span>  публикаций
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={c.posts}>
                <hr/>
                <div className={c.posts_head}>

                    <div onClick={()=>{
                        setPosts(true);
                        setSaves(false);
                    }} className={posts ? c.bold : c.normal}>
                        <BsGrid3X3/>
                         <span className={c.spans}>
                             ПУБЛИКАЦИИ
                         </span>
                    </div>
                    <div onClick={()=>{
                        setPosts(false);
                        setSaves(true);
                    }} className={saves ? c.bold : c.normal}>
                        <BsBookmark />
                        <span className={c.spans}>
                            СОХРАНЕННОЕ
                        </span>
                    </div>
                    <div>
                        <CgProfile/>
                        <span className={c.spans}>
                            ОТМЕТКИ
                        </span>
                    </div>
                </div>
                <div className={c.cards}>
                    {
                        userPosts?.length > 0 && posts ? (
                            userPosts?.map(u => (
                                <Posts key={u.id} u={u}/>
                            ))
                        ) : saves ? (
                            <div className={c.cardsCon}>
                                {savesMapped}
                            </div>
                        ) : (
                            <div className={c.noPosts}>
                                <MdOutlineImageNotSupported/>
                                <p>НЕТ ПОСТОВ</p>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Profile;