import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {API} from "../../redux/api";
import {Link, useNavigate} from "react-router-dom";
import c from './main.module.scss';
import Loader from "../loader/loader";
import noProfile from '../../../img/1.jpg';
import {IoClose} from "@react-icons/all-files/io5/IoClose";
import Follows from "./follows/follows";
import PostsMain from "./posts/postsMain";

const Main = () => {
    const user = useSelector(state => state.allState.user);
    const users = useSelector(state => state.allState.users);
    const follows = useSelector(state => state.allState.follows);
    const isFetching = useSelector(state => state.allState.isFetching);
    const stories = useSelector(state => state.allState.stories);
    const subPosts = useSelector(state => state.allState.subPosts);
    const accessToken = localStorage.getItem('accessToken');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (user != '') {
                navigate('/')
            } else {
                navigate('/login')
            }
        }, 1100)

    }, [user, subPosts])



    //FOLLOW
    const follow = (data) => {
        API.follow(data, accessToken)
    }

    //FOLLOWS
    const followsMapped = follows.map(f => (<Follows key={f.id} f={f}/>))

    //POSTS
    const subPostsFiltered = subPosts.filter(s => s.length > 0);
    const subPostsMapped = subPostsFiltered.map(p => (<PostsMain key={p.id} p={p}/>));

    return (
        <div className={c.container}>
            {
                isFetching ?
                (
                    <Loader/>
                ) : (
                    <div className={c.main}>
                        <div className={ follows && open ? c.recFollow : `${c.recFollow} ${c.inActive}`}>
                            <div className={c.recFollow_block}>
                                <IoClose className={c.close} onClick={() => setOpen(true)}/>
                                {users?.map(u => (<div key={u.id} className={c.recFollow_users}>

                                    <div className={c.recFollow_users_avatar}>
                                        {u.avatar?.length > 1 ? (<img src={u.avatar} alt="#"/>) : (
                                            <img src={noProfile} alt="#"/>)}
                                        <span className={c.recFollow_users_avatar_span}>
                                              {u.username}
                                            </span>
                                    </div>

                                    <button className={c.recFollow_users_followBtn} onClick={() => follow(u.id)}>
                                        Подписаться
                                    </button>
                                </div>))}
                            </div>
                        </div>

                    <div className={c.main_body}>
                        <div className={c.main_body_header}>
                            {followsMapped}
                        </div>
                        <div className={c.main_body_posts}>
                            {subPostsMapped}
                        </div>
                    </div>
                    <div className={c.main_user}>
                        <div className={c.main_user_avatar}>
                            <div className={c.main_user_avatar_1}>
                                <Link to={'/profile'}>
                                    <img src={user.avatar} alt="#"/>
                                </Link>
                                    <span>
                                        <Link to={'/profile'}>
                                            {user.username}
                                        </Link>
                                    </span>
                            </div>
                            <div className={c.main_user_avatar_2}>
                                <Link to={'/login'}>
                                    Переключиться
                                </Link>
                            </div>

                        </div>
                        <div className={c.main_user_rec}>

                        </div>
                    </div>
                </div>
                )}
        </div>);
};

export default Main;