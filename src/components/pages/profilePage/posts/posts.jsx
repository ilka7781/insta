import React, {useState} from 'react';
import c from './posts.module.scss';
import {Link} from "react-router-dom";
import {AiFillHeart} from "@react-icons/all-files/ai/AiFillHeart";
import {selectedPost} from "../../../redux/reducers";
import {useDispatch} from "react-redux";
import noProfile from "../../../../img/1.jpg";

const Posts = ({u}) => {
    const base ='https://cryxxxen.pythonanywhere.com/';
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const selectPost =() => {
        dispatch(selectedPost(u));
    }
    return (
        <div className={c.cards} onClick={selectPost} onMouseEnter={()=> setShow(!show)} onMouseLeave={()=> setShow(!show)}>
            <Link to={'/postDetail'} >
                {
                    u.post_images[0]?.image !== '' ? (
                        <img className={c.cards_img} src={`${base}${u.post_images[0]?.image}`} alt="#"/>
                    ) : (
                        <img className={c.cards_img} src={noProfile}  />
                    )
                }
                <div className={show ? `${c.layout} ${c.show}`  : `${c.layout} ${c.inactive}`}>
                    <div className={c.likes}>
                        <AiFillHeart/>
                        <span className={c.liked}>
                            {u?.liked.length > 0 ? u?.liked.length : 0}
                        </span>
                    </div>
                </div>
            </Link>

        </div>
    );
};

export default Posts;