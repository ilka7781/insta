import React, {useState} from 'react';
import c from "./postsProfileDetail.module.scss";
import {Link} from "react-router-dom";
import noProfile from "../../../../../img/1.jpg";
import {AiFillHeart} from "@react-icons/all-files/ai/AiFillHeart";
import {useDispatch} from "react-redux";
import {selectedPost} from "../../../../redux/reducers";

const PostsProfileDetail = ({s}) => {
    const base ='https://cryxxxen.pythonanywhere.com/';
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const selectPost =() => {
        dispatch(selectedPost(s));
    }

    return (
        <div className={c.cards} onClick={selectPost} onMouseEnter={()=> setShow(!show)} onMouseLeave={()=> setShow(!show)}>
            <Link to={'/postDetail'} >
                {
                    s.post_images[0] ? (
                        <img className={c.cards_img} src={`${base}${s.post_images[0]?.image}`} alt="#"/>
                    ) : (
                        <img className={c.cards_img} src={noProfile} alt={'#'} />
                    )

                }

                <div className={show ? `${c.layout} ${c.show}`  : `${c.layout} ${c.inactive}`}>
                    <div className={c.likes}>
                        <AiFillHeart/>
                        <span className={c.liked}>
                            {s?.liked.length > 0 ? s?.liked.length : 0}
                        </span>
                    </div>
                </div>
            </Link>

        </div>
    );
};

export default PostsProfileDetail;