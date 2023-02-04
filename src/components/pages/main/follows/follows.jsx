import React from 'react';
import c from './follows.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectedUserAction} from "../../../redux/reducers";
import {API} from "../../../redux/api";
import noProfile from '../../../../img/1.jpg';

const Follows = ({f}) => {
    const users = useSelector(state => state.allState.users);
    const filteredUsers = users.filter(follows => follows.id === f?.to_user);
    const dispatch= useDispatch();

    const selectUser = (fi) => {
        dispatch(selectedUserAction(fi));
        API.getSelectedUserPosts(fi.id);
    }

    return (
        <div className={c.followCards}>
            {
                filteredUsers.map(fi => (
                    <div onClick={()=> selectUser(fi)}>
                        <Link to={'/profileDetail'} >
                            <img key={fi.id} src={fi.avatar ? fi.avatar : noProfile} alt="#"/>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default Follows;