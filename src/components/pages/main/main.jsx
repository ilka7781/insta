import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {API} from "../../redux/api";
import {Link, useNavigate} from "react-router-dom";
import c from './main.module.scss';
import Loader from "../loader/loader";
import noProfile from '../../../img/1.jpg';
import {IoClose} from "@react-icons/all-files/io5/IoClose";
import Follows from "./follows/follows";
import PostsMain from "./posts/postsMain";
import {IoMdAddCircleOutline} from "@react-icons/all-files/io/IoMdAddCircleOutline";
import {BsImages} from "@react-icons/all-files/bs/BsImages";
import {useForm} from "react-hook-form";



const Main = () => {
    const user = useSelector(state => state.allState.user);
    const users = useSelector(state => state.allState.users);
    const follows = useSelector(state => state.allState.follows);
    const allStories = useSelector(state => state.allState.allStories);
    const isFetching = useSelector(state => state.allState.isFetching);
    const subPosts = useSelector(state => state.allState.subPosts);
    const accessToken = sessionStorage.getItem('accessToken');
    const [open, setOpen] = useState(false);
    const [openAddStory, setOpenAddStory] = useState(false);
    const [img, setImg] = useState(null);
    const navigate = useNavigate();

    const avatar =  user.avatar ? user.avatar : noProfile;

    //story

    const {handleSubmit} = useForm({
        mode: "onChange",
        defaultValues: {
            img: null
        }
    });
    const handleImg = () => {
        const formData = new FormData;
        formData.append('file', img);
        API.postStories(formData, user.id, accessToken);
    }


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
    const stories = allStories.map(f => (<Follows key={f.id} f={f}/>));

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
                            <div className={c.profile_info_stories_add}>
                                <IoMdAddCircleOutline className={c.profile_info_stories_add} onClick={() => {
                                    if (openAddStory === false) {
                                        setOpenAddStory(true)
                                    } else {
                                        setOpenAddStory(false)
                                    }
                                }}/>

                                <div className={openAddStory ? c.layout : `${c.layout} ${c.inActive}`}>
                                    <div className={c.layout_block}>
                                        <p className={c.layout_block_p}>Создание сторис</p>
                                        <hr/>
                                        <div className={c.layout_block_add}>
                                            <IoClose className={c.close} onClick={() => setOpenAddStory(false)}/>
                                            <BsImages/>
                                            <p className={c.layout_block_p2}>
                                                Выберите фото
                                            </p>
                                            <form className={c.form} onSubmit={handleSubmit(data => handleImg(data))}>
                                                <label className={c.foto} htmlFor={'upload_file1'}>
                                                    Загрузить фото
                                                </label>
                                                <p className={img ? c.vybrano : `${c.vybrano} ${c.input}`}>
                                                    Выбрано фото {img?.name}
                                                </p>
                                                <input id={'upload_file1'} type="file" className={c.input}
                                                       onChange={(e) => setImg(e.target.files[0])}/>
                                                <button className={c.upload}>
                                                    Добавить сторис
                                                </button>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {stories}
                        </div>
                        <div className={c.main_body_posts}>
                            {subPostsMapped}
                        </div>
                    </div>
                    <div className={c.main_user}>
                        <div className={c.main_user_avatar}>
                            <div className={c.main_user_avatar_1}>
                                <Link to={'/profile'}>
                                    <img src={avatar} alt="#"/>
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
                    </div>
                </div>
                )}
        </div>);
};

export default Main;