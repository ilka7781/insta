import React, {useCallback, useState} from 'react';
import c from './sidebar.module.scss';
import inst from '../../../img/Instagram-PNG-Image-45556.png';
import {AiOutlineHome} from "@react-icons/all-files/ai/AiOutlineHome";
import {Link, useNavigate} from "react-router-dom";
import {BsSearch} from "@react-icons/all-files/bs/BsSearch";
import {useDispatch, useSelector} from "react-redux";
import {GiHamburgerMenu} from "@react-icons/all-files/gi/GiHamburgerMenu";
import {AiOutlinePlusSquare} from "@react-icons/all-files/ai/AiOutlinePlusSquare";
import {BsImages} from "@react-icons/all-files/bs/BsImages";
import {API} from "../../redux/api";
import {IoClose} from "@react-icons/all-files/io5/IoClose";
import {useForm} from "react-hook-form";
import noProfile from "../../../img/1.jpg";
import {findUsersAction} from "../../redux/reducers";
import {AiOutlineSearch} from "@react-icons/all-files/ai/AiOutlineSearch";


const Sidebar = () => {
    const user = useSelector(state => state.allState.user);
    const users = useSelector(state => state.allState.users);
    const postId = useSelector(state => state.allState.userPostImageId?.id);
    const foundUsers = useSelector(state => state.allState.foundUsers);
    const follows = useSelector(state => state.allState.follows);

    const [open, setOpen] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const [img, setImg] = useState(null);
    const [openEshe, setOpenEshe] = useState(false);

    const avatar =  user.avatar ? user.avatar : noProfile;

    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const dispatch = useDispatch();

    const navigate= useNavigate();

    const {register, handleSubmit, formState: {errors}, isValid} = useForm({
        mode: "onChange",
        defaultValues: {
            des: '',
            img: null
        }
    });

    //POST
    const handlePost = (data) => {
        const formData = new FormData;
        formData.append('title', data.des);
        if (formData) {
            API.postPost(formData, accessToken);
        }
    }
    const handleImg = (data) => {
        const formData = new FormData;
        formData.append('post', postId);
        formData.append('image', img);
        API.postImage(formData, user?.id, accessToken);
        setTimeout(() => {
            API.getUserPosts(user?.id);
        }, 1500)
    }

    //FOLLOW
    const follow = (data) => {
        API.follow(data, accessToken)
    }

    //FIND_USERS
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 300);
        }
    }

    //DELETE_FOLLOW
    const followsM = follows.map(f => {
        return f.to_user
    })
    const deleteFollow = (data) => {
        API.deleteFollow(data, user.id);
    }

    //logOut
    const logOut = () => {
        API.logOut(refreshToken, accessToken);
        localStorage.clear();

        setTimeout(( )=>{
            navigate('/login');
        }, 500)
    }

    const handleChange = (event) => {
        const searchQuery = event.target.value;
        if (searchQuery.length > 1) {
            const foundUsers = users?.filter((users) => users.username.toLowerCase().includes(searchQuery.toLowerCase()));
            if (foundUsers?.length > 0) {
                dispatch(findUsersAction(foundUsers));
            }
        } else {
            dispatch(findUsersAction(''));
        }
    }
    const optimizedVersion = useCallback(debounce(handleChange));

    return (
        <div>
            <div className={openUsers ? c.recFollow : `${c.recFollow} ${c.inActive}`}>
                <div className={c.recFollow_block}>
                    <IoClose className={c.closeUsers} onClick={() => setOpenUsers(false)}/>
                    <div className={c.inputSearch_block}>
                        <input type="text" placeholder={'Введи никнейм'}
                               onChange={optimizedVersion} className={c.inputSearch}/>
                        <AiOutlineSearch/>
                    </div>

                    {
                        foundUsers.length < 1 ? (
                            users?.map(u => (
                                <div key={u.id} className={c.recFollow_users}>
                                    <div className={c.recFollow_users_avatar}>
                                        {
                                            u.avatar?.length > 1 ? (
                                                <img src={u.avatar} alt="#"/>
                                            ) : (
                                                <img src={noProfile} alt="#"/>
                                            )
                                        }
                                        <span className={c.recFollow_users_avatar_span}>
                                              {u.username}
                                            </span>
                                    </div>

                                    <button className={follows.filter(f => f.to_user !== u.id) ?  c.recFollow_users_followBtn : c.recFollow_users_unFollowBtn} onClick={() => follow(u.id)}>
                                        Подписаться
                                    </button>
                                </div>
                            ))
                        ) : (foundUsers && foundUsers?.length !== 0) ? (
                            foundUsers?.map(f => (
                                <div key={f.id} className={c.recFollow_users}>

                                    <div className={c.recFollow_users_avatar}>
                                        {
                                            f.avatar?.length > 1 ? (
                                                <img src={f.avatar} alt="#"/>
                                            ) : (
                                                <img src={noProfile} alt="#"/>
                                            )
                                        }
                                        <span className={c.recFollow_users_avatar_span}>
                                              {f.username}
                                            </span>
                                    </div>
                                    {
                                        users.id === follows.id ? (
                                            <button className={c.recFollow_users_unFollowBtn}
                                                    onClick={() => follow(f.id)}>
                                                Отписаться
                                            </button>
                                        ) : (
                                            <button className={c.recFollow_users_followBtn}
                                                    onClick={() => follow(f.id)}>
                                                Подписаться
                                            </button>
                                        )
                                    }
                                </div>
                            ))
                        ) : (
                            <div>
                                <h1>no users</h1>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className={accessToken && user?.id ? c.sidebar : `${c.sidebar} ${c.inActive}`}>
                <div className={c.sidebarContent}>
                    <div className={c.sidebarContent_img}>
                        <img className={c.img} src={inst} alt="#"/>
                    </div>
                    <div className={c.sidebarContent_links}>
                        <ul>
                            <li>
                                <Link to='/'>
                                    <AiOutlineHome/>
                                    <div className={c.linksa}>
                                        Главная
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <BsSearch onClick={() => {
                                        if (openUsers === false) {
                                            setOpenUsers(true)
                                        } else {
                                            setOpenUsers(false)
                                         }
                                    } }/>
                                    <div className={c.linksa} onClick={() => setOpenUsers(true)}>
                                        Поисковый запрос
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <AiOutlinePlusSquare onClick={() => {
                                        if (open === false) {
                                            setOpen(true)
                                        } else {
                                            setOpen(false)
                                        }
                                    } }/>
                                    <div className={c.linksa} onClick={() => setOpen(true)}>
                                        Создать
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to='/profile'>
                                    <img className={c.avatar} src={avatar} alt="#"/>
                                    <div className={c.linksa}>
                                        Профиль
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={c.sidebarContent_more}>
                        <GiHamburgerMenu onClick={()=> {
                            if (openEshe === false){
                                setOpenEshe(true)
                            } else {
                                setOpenEshe(false)
                            }
                        }}/>
                        <span className={c.eshe} onClick={()=> {
                            if (openEshe === false){
                                setOpenEshe(true)
                            } else {
                                setOpenEshe(false)
                            }
                        }}>
                         Ещё
                       </span>
                    </div>
                    <div className={openEshe ? c.esheDiv : `${c.esheDiv} ${c.inActive}`}>
                        <span onClick={logOut}>
                            Выйти
                        </span>
                    </div>
                </div>
            </div>
            <div className={open ? c.layout : `${c.layout} ${c.inActive}`}>
                <div className={c.layout_block}>
                    <p className={c.layout_block_p}>Создание публикации</p>
                    <hr/>
                    <div className={c.layout_block_add}>
                        <form className={c.form} onSubmit={handleSubmit(data => handlePost(data))}>
                            <input {...register('des', {required: 'Заполни описание'})} type="text"
                                   placeholder='Описание'/>
                            {errors?.des && <span>{errors?.des.message}</span>}
                            <button className={c.upload}>
                                Добавить пост
                            </button>
                            <p className={c.secondary}>Сначала кликните на пост</p>
                        </form>
                        <IoClose className={c.close} onClick={() => setOpen(false)}/>
                        <BsImages/>
                        <p className={c.layout_block_p2}>
                            Выберите фото
                        </p>
                        <form className={c.form} onSubmit={handleSubmit(data => handleImg(data))}>
                            <label className={c.foto} htmlFor={'upload_file'}>
                                Загрузить фото
                            </label>
                            <p className={img ? c.vybrano : `${c.vybrano} ${c.input}` }>
                                Выбрано фото {img?.name}
                            </p>
                            <input id={'upload_file'} type="file" className={c.input}
                                   onChange={(e) => setImg(e.target.files[0])}/>
                            <button className={c.upload}>
                                Добавить фотку
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;