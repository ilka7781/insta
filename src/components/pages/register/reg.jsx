import React, {useState} from 'react';
import c from './reg.module.scss';
import image from '../../../img/Instagram-PNG-Image-45556.png';
import image2 from '../../../img/google.png';
import image3 from '../../../img/micro.png';
import {Link, useNavigate} from "react-router-dom";
import {API} from "../../redux/api";
import {useForm} from "react-hook-form";
import {isFetchingAction} from "../../redux/reducers";
import {useDispatch} from "react-redux";


const Reg = () => {
    const [password, setPassword] = useState('');
    const [password_repeat, setReppassword] = useState('');
    const [avatar, setImg] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            user_name: '',
            first_name: '',
            last_name: '',
            password: '',
            password_repeat: '',
            avatar: null,
            bio: ''
        }
    })


    const handleRegister = (data) => {
        const formData = new FormData();
        formData.append('username', data.user_name);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('bio', data.bio);
        formData.append('avatar', avatar);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('password_repeat', data.password_repeat);

        if (formData){
            API.register(formData);
            dispatch(isFetchingAction(true));
            setTimeout(()=> {
                API.getToken({username: data.user_name, password: data.password});
                API.getUsers();
                navigate('/');
            },2000)
        }
        reset();
    }

    return (
        <div className={c.container}>
            <div className={c.login}>
                <img className={c.instImg} src={image} alt="inst"/>
                <h2 className={c.des}>
                    Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
                </h2>
                <form className={c.form} onSubmit={handleSubmit(data => handleRegister(data))}>
                    <input className={c.inputs} type="text" placeholder='Логин'
                           {...register('user_name', {
                               required: 'Заполните логин!'
                           })}

                    />
                    {errors?.user_name && <span className={c.errors}> {errors?.user_name.message} </span>}

                    <input className={c.inputs} type="text" placeholder='Био'
                           {...register('bio', {
                               required: 'Заполните  био!'
                           })}
                    />
                    {errors?.bio && <span className={c.errors}> {errors?.bio.message} </span>}

                    <input className={c.inputs} type="file" placeholder='Аватарка'
                           {...register('avatar', {
                               required: 'Выберите картинку!'
                           })}
                           onChange={(e) => setImg(e.target.files[0])}
                    />
                    {errors?.avatar && <span className={c.errors}> {errors?.avatar.message} </span>}

                    <input className={c.inputs} type="text" placeholder='Эл.адрес'
                           {...register('email', {
                               required: 'Заполните эл.адрес!'
                           })}
                    />
                    {errors?.email && <span className={c.errors}> {errors?.email.message} </span>}

                    <input className={c.inputs} type="text" placeholder='Имя'
                           {...register('first_name', {
                               required: 'Заполните имя!'
                           })}
                    />
                    {errors?.first_name && <span className={c.errors}> {errors?.first_name.message} </span>}

                    <input className={c.inputs} type="text" placeholder='Фамилия'
                           {...register('last_name', {
                               required: 'Заполните фамилию!'
                           })}
                    />
                    {errors?.last_name && <span className={c.errors}> {errors?.last_name.message} </span>}

                    <input className={c.inputs} type="password" placeholder='Пароль'
                           {...register('password', {
                               minLength: {value: 8, message: 'Минимум 8 символов!'},
                               required: 'Заполните пароль!'
                           })}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors?.password && <span className={c.errors}> {errors?.password.message} </span>}

                    <input className={c.inputs} type="password" placeholder='Повтори пароль'
                           {...register('password_repeat', {
                               minLength: {value: 8, message: 'Минимум 8 символов'},
                               required: 'Заполните повторно!',
                               validate: () => {
                                   if (password !== password_repeat) {
                                       return 'Пароли не совпадают!'
                                   }
                               }
                           })}
                           onChange={(e) => setReppassword(e.target.value)}
                    />
                    {errors?.password_repeat && <span className={c.errors}> {errors?.password_repeat.message} </span>}

                    <button className={c.button}>Зарегистрироваться</button>
                </form>
            </div>

            <div className={c.footer}>
                <div>
                    Есть аккаунт?
                    <Link className={c.link} to={'/login'}>
                        Вход
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
    );
};

export default Reg;