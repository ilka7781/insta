import React from 'react';
import c from './loader.module.scss';
import instaLogo from '../../../img/[removal.ai]_0dd14ca6-a4b2-4fad-a1bd-c2bcc7c5bb7a.png';

const Loader = () => {
    return (
        <div className={c.container}>
            <img src={instaLogo} alt="#"/>
        </div>
    );
};

export default Loader;