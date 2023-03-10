import React, {useState} from 'react';
import c from './profile.module.scss';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {BsGrid3X3} from "@react-icons/all-files/bs/BsGrid3X3";
import {BsBookmark} from "@react-icons/all-files/bs/BsBookmark";
import {CgProfile} from "@react-icons/all-files/cg/CgProfile";
import {API} from "../../redux/api";
import {MdOutlineImageNotSupported} from "react-icons/md";
import Posts from "./posts/posts";
import SavesPosts from "./savesPosts/savesPosts";
import {IoMdAddCircleOutline} from "@react-icons/all-files/io/IoMdAddCircleOutline";
import {IoClose} from "@react-icons/all-files/io5/IoClose";
import {BsImages} from "@react-icons/all-files/bs/BsImages";
import {useForm} from "react-hook-form";
import noProfile from '../../../img/1.jpg';
import {AiFillDelete} from "@react-icons/all-files/ai/AiFillDelete";


const Profile = () => {
    const user = useSelector(state => state.allState.user);
    const userPosts = useSelector(state => state.allState.userPosts);
    const saveS = useSelector(state => state.allState.saves);
    const stories = useSelector(state => state.allState.stories);
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem('accessToken');
    const [posts, setPosts] = useState(true);
    const [saves, setSaves] = useState(false);
    const [open,setOpen] = useState(false);
    const [openAddStory, setOpenAddStory] = useState(false);
    const [img, setImg] = useState(null);
    const base = 'https://cryxxxen.pythonanywhere.com/';


    const avatar = user?.avatar ? user?.avatar : noProfile;

    const setOpenFunc = () => {
        if (open === false) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    const {handleSubmit} = useForm({
        mode: "onChange",
        defaultValues: {
            img: null
        }
    });

    const savesMapped = saveS.map(s => (
        <SavesPosts s={s}/>
    ))
    //STORY
    const handleImg = () => {
        const formData = new FormData;
        formData.append('file', img);
        API.postStories(formData, user.id, accessToken);
    }

    const deleteStory = (storyId) => {
        API.deleteStory(storyId,accessToken, user?.id )
    }


    const storiesMapped = stories?.map(s => (
        <div key={s.id} onClick={setOpenFunc}>
            <div className={c.profile_info_stories_divs}>
                <img src={`${base}${s?.file}`} alt="#"/>
            </div>

            <div className={open ? c.layOut : `${c.layOut} ${c.inActive}`}>
                <div className={c.containerS}>
                    <div className={c.userBlock}>
                        <div className={c.userBlock_1div} onClick={setOpenFunc}>
                                <img className={c.avatar} src={avatar} alt="#"/>
                                <span className={c.userBlock_span}>
                                  {user?.username}
                                </span>
                        </div>

                        <div className={c.buttonS}>
                            <IoClose onClick={() => setOpen(false)}/>
                            <AiFillDelete className={c.buttonD} onClick={() => deleteStory(s?.id)}/>
                        </div>
                    </div>

                    <div className={c.layOut_img}>
                        <img className={c.imgS} src={`${base}${s?.file}`} alt="#"/>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div className={c.container}>
            <div className={c.profile}>
                <div className={c.profileFlex}>
                    <div className={c.profileFlex_img}>
                        <img className={c.img} src={user.avatar} alt="#"/>
                    </div>
                    <div className={c.profile_info}>
                        <div className={c.profile_info_head}>
                        <span>
                            {user.username}
                        </span>
                            <button className={c.button} onClick={() => navigate('/profileEdit')}>
                                ?????????????????????????? ??????????????
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
                                    <span
                                        className={c.bold}>{user.subscriptions ? user.subscriptions : 0}</span> ????????????????
                                </li>
                                <li>
                                    <span
                                        className={c.bold}>{user.subscribers ? user.subscribers : 0}</span> ??????????????????????
                                </li>
                                <li>
                                    <span className={c.bold}>{userPosts.length}</span> ????????????????????
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className={c.profile_info_stories}>
                    <IoMdAddCircleOutline className={c.profile_info_stories_add} onClick={() => {
                        if (openAddStory === false) {
                            setOpenAddStory(true)
                        } else {
                            setOpenAddStory(false)
                        }
                    }}/>

                    <div
                        className={stories?.length > 0 ? `${c.profile_info_stories_noDivs} ${c.inActive}` : c.profile_info_stories_noDivs}>
                        <p>
                            ???????????????? ????????????
                        </p>
                    </div>

                    {
                        storiesMapped
                    }

                    <div className={openAddStory ? c.layout : `${c.layout} ${c.inActive}`}>
                        <div className={c.layout_block}>
                            <p className={c.layout_block_p}>???????????????? ????????????</p>
                            <hr/>
                            <div className={c.layout_block_add}>
                                <IoClose className={c.close} onClick={() => setOpenAddStory(false)}/>
                                <BsImages/>
                                <p className={c.layout_block_p2}>
                                    ???????????????? ????????
                                </p>
                                <form className={c.form} onSubmit={handleSubmit(data => handleImg(data))}>
                                    <label className={c.foto} htmlFor={'upload_file1'}>
                                        ?????????????????? ????????
                                    </label>
                                    <p className={img ? c.vybrano : `${c.vybrano} ${c.input}`}>
                                        ?????????????? ???????? {img?.name}
                                    </p>
                                    <input id={'upload_file1'} type="file" className={c.input}
                                           onChange={(e) => setImg(e.target.files[0])}/>
                                    <button className={c.upload}>
                                        ???????????????? ????????????
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>

            </div>


            <div className={c.posts}>
                <hr/>
                <div className={c.posts_head}>

                    <div onClick={() => {
                        setPosts(true);
                        setSaves(false);
                    }} className={posts ? c.bold : c.normal}>
                        <BsGrid3X3/>
                        <span className={c.spans}>
                             ????????????????????
                         </span>
                    </div>
                    <div onClick={() => {
                        setPosts(false);
                        setSaves(true);
                    }} className={saves ? c.bold : c.normal}>
                        <BsBookmark/>
                        <span className={c.spans}>
                            ??????????????????????
                        </span>
                    </div>
                    <div>
                        <CgProfile/>
                        <span className={c.spans}>
                            ??????????????
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
                                <p>?????? ????????????</p>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Profile;