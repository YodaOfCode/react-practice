import React, {useContext} from 'react';
import Input from "../component/UI/input/Input";
import Button from "../component/UI/button/Button";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = (e) => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <form onSubmit={login}>
                <h1>Страница логина</h1>
                <Input type="login" placeholder='Введите логин'/>
                <Input type="password" placeholder='Введите пароль'/>
                <Button>Войти</Button>
            </form>
        </div>

    );
};

export default Login;