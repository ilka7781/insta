import React, {useEffect} from 'react';
import c from './login.module.scss';
import image from "../../../img/Instagram-PNG-Image-45556.png";
import {Link, useNavigate} from "react-router-dom";
import image2 from "../../../img/google.png";
import image3 from "../../../img/micro.png";
import image4 from "../../../img/screenshot3.png";
import {useForm} from "react-hook-form";
import {API} from "../../redux/api";
import {useDispatch, useSelector} from "react-redux";
import {isFetchingAction} from "../../redux/reducers";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',
        defaultValues: {
            user_name: '',
            password: ''
        }
    })

    const handleLogin = (data) => {
        const formData = new FormData();
        formData.append('username', data.user_name);
        formData.append('password', data.password);

        if (formData){
            API.getToken({username: data.user_name, password: data.password});
            setTimeout(()=>{
                API.getUsers();
                dispatch(isFetchingAction(true));
                navigate('/')
            },1000)
        }
    }


    return (
        <div className={c.container}>
            <div className={c.loginCon}>
                <div className={c.leftImg}>
                    <img src={image4} alt="#"/>
                </div>
                <div>
                    <div className={c.login}>
                        <img className={c.instImg} src={image} alt="inst"/>

                        <form className={c.form} onSubmit={handleSubmit(data => handleLogin(data))}>
                            <input className={c.inputs} type="text" placeholder='Логин'
                                   {...register('user_name', {
                                       required: 'Заполните логин!'
                                   })}

                            />
                            {errors?.user_name && <span className={c.errors}> {errors?.user_name.message} </span>}

                            <input className={c.inputs} type="password" placeholder='Пароль'
                                   {...register('password', {
                                       minLength: {value: 8, message: 'Минимум 8 символов!'},
                                       required: 'Заполните пароль!'
                                   })}
                            />
                            {errors?.password && <span className={c.errors}> {errors?.password.message} </span>}

                            <button className={c.button}>Войти</button>
                        </form>
                    </div>

                    <div className={c.footer}>
                        <div>
                            Нет аккаунта?
                            <Link className={c.link} to={'/reg'}>
                                Зарегистрироваться
                            </Link>
                        </div>
                    </div>

                    <div className={c.footerInsta}>
                        <p>Установите приложение.</p>
                        <div className={c.footerInsta_img}>
                            <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3D0D33804D-E893-4759-A606-48196B8C5C4B%26utm_content%3Dlo%26utm_medium%3Dbadge"
                               target='_blank'><img src={image2} alt="#"/></a>
                            <a href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1050"
                               target='_blank'><img src={image3} alt="#"/></a>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;