import React, {useState} from 'react';
import c from './follows.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectedUserAction} from "../../../redux/reducers";
import {API} from "../../../redux/api";
import noProfile from '../../../../img/1.jpg';
import {IoClose} from "@react-icons/all-files/io5/IoClose";
import {Link} from "react-router-dom";

const UsersStories = ({u, f}) => {
    const dispatch = useDispatch();
    const avatar = u?.avatar ? u?.avatar : noProfile;
    const [open, setOpen] = useState(false);

    const setOpenFunc = () => {
        if (open === false) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }
    const selectUser = () => {
        dispatch(selectedUserAction(u));
        API.getSelectedUserPosts(f.user);
    }

    return (
        <div>
            <div className={c.followCards} onClick={setOpenFunc}>
                <img className={open ? `${c.avatar} ${c.inActiveStory}` : c.avatar} src={avatar} alt=""/>
            </div>

            <div className={open ? c.layOut : `${c.layOut} ${c.inActive}`}>
                <div className={c.container}>
                    <div className={c.userBlock}>
                        <div className={c.userBlock_1div} onClick={selectUser}>
                            <Link to={'/profileDetail'} >
                                <img onClick={()=> selectUser(u)} className={c.avatar} src={u?.avatar} alt=""/>
                                <span className={c.userBlock_span}>
                                  {u?.username}
                                </span>
                            </Link>
                        </div>

                        <div className={c.button}>
                            <IoClose onClick={() => setOpen(false)}/>
                        </div>
                    </div>

                    <div className={c.layOut_img}>
                        <img className={c.img} src={f?.file} alt=""/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UsersStories;