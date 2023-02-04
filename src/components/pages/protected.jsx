import React from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

const Protected = ({children}) => {
    const user = useSelector(state => state.allState.user);
    const accessToken = localStorage.getItem('accessToken');
    const navigate =useNavigate();

    if (user !== '' && accessToken){
        return children
    } else {
        return navigate('/login')
    }
};

export default Protected;