import React from 'react';
import {useSelector} from "react-redux";
import c from "./profileDetail.module.scss";
import {BsGrid3X3} from "@react-icons/all-files/bs/BsGrid3X3";
import {CgProfile} from "@react-icons/all-files/cg/CgProfile";
import {MdOutlineImageNotSupported} from "react-icons/md";
import PostsProfileDetail from "./profileDetailPosts/postsProfileDetail";

const ProfileDetail = () => {
    const selectedUser = useSelector(state => state.allState.selectedUser);
    const selectedUserPosts = useSelector(state => state.allState.selectedUserPosts);


    return (
        <div className={c.container}>
            <div className={c.profile}>
                <div className={c.profile_img}>
                    <img className={c.img} src={selectedUser?.avatar ? selectedUser?.avatar : selectedUser[0]?.avatar } alt="#"/>
                </div>
                <div className={c.profile_info}>
                    <div className={c.profile_info_head}>
                        <span>
                            {selectedUser?.username ? selectedUser?.username : selectedUser[0]?.username}
                        </span>
                    </div>
                    <div className={c.profile_info_body}>
                        <ul>
                            <li className={c.bio}>
                                {selectedUser?.bio ? selectedUser?.bio : selectedUser[0]?.bio}
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span className={c.bold}>{selectedUser?.subscriptions ? selectedUser?.subscriptions: selectedUser[0]?.subscriptions}</span> подписок
                            </li>
                            <li>
                                <span className={c.bold}>{selectedUser?.subscribers ? selectedUser?.subscribers: selectedUser[0]?.subscribers}</span> подписчиков
                            </li>
                            <li>
                                <span className={c.bold}>{selectedUserPosts?.length}</span> публикаций
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={c.posts}>
                <hr/>
                <div className={c.posts_head}>

                    <div>
                        <BsGrid3X3/>
                        <span className={c.spans}>
                           ПУБЛИКАЦИИ
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
                        selectedUserPosts?.length > 0 ? (
                            selectedUserPosts?.map(s => (
                                <PostsProfileDetail key={s.id} s={s}/>
                            ))
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

export default ProfileDetail;