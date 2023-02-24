import React from 'react';
import c from './follows.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectedUserAction} from "../../../redux/reducers";
import {API} from "../../../redux/api";

import UsersStories from "./usersStories";

const Follows = ({f}) => {
    const users = useSelector(state => state.allState.users);

    const filteredUsers = users.filter(item => item.id === f?.user);

   const uStories = filteredUsers.map(u => (
        <UsersStories key={u.id} u={u} f={f} />
    ))


    return (
        <div className={c.followCards}>
            {
                uStories
            }
        </div>
    );
};

export default Follows;