import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context";
import Button from "../button/Button";

const Navigation = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <div className='navbar__item'>
                <Button onClick={() => setIsAuth(false)}>Выйти</Button>
            </div>
            <div className='navbar__item'>
                <Link to="/about">О нас</Link>
            </div>
            <div className='navbar__item'>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    );
};

export default Navigation;