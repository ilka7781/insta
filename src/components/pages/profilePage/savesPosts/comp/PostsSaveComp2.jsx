import React, {useState} from 'react';
import c from './postsSaveComp.module.scss';
import {Link} from "react-router-dom";
import noProfile from "../../../../../img/1.jpg";
import {AiFillHeart} from "@react-icons/all-files/ai/AiFillHeart";
import {useDispatch} from "react-redux";
import {selectedPost} from "../../../../redux/reducers";

const PostsSaveComp2 = (props) => {
    const filteredSubPosts = props.si.filter(s=> s.id === props.save.post);
    const base ='https://cryxxxen.pythonanywhere.com/';
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const le = filteredSubPosts.filter(f => f[0] !== null);
    console.log(le)
    const selectPost =(f) => {
        dispatch(selectedPost(f));
    }

    const filteredMap = le?.map(f=>(
        <div className={c.cards} onClick={() => selectPost(f)} onMouseEnter={()=> setShow(!show)} onMouseLeave={()=> setShow(!show)}>
            <Link to={'/postDetail'} >
                {
                    f?.post_images[0]?.image ? (
                        <img className={c.cards_img} src={`${base}${f.post_images[0]?.image}`} alt="#"/>
                    ) : (
                        <img className={c.cards_img} src={noProfile}  />
                    )
                }
                <div className={show ? `${c.layout} ${c.show}`  : `${c.layout} ${c.inactive}`}>
                    <div className={c.likes}>
                        <AiFillHeart/>
                        <span className={c.liked}>
                            {f?.liked.length > 0 ? f?.liked.length : 0}
                        </span>
                    </div>
                </div>
            </Link>

        </div>
    ))
    return (
        <div className={c.cards}>
            {
                filteredMap
            }
        </div>
    );
};

export default PostsSaveComp2;