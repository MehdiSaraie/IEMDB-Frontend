import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../../assets/css/login-signup.css";
import Header from "../Header";
import { useAuth } from '../../hooks/use-auth';
import Input from '../components/Input';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const auth = useAuth();

    function login(e) {
        e.preventDefault();
        console.log(auth)
        auth.login(email, password).then(() => {
            toast.success('باموفقیت وارد شدید.');
            // history.goBack();
            history.push('/')
        }).catch((err) => {
            let message;
            if (err.response.status === 401)
                message = 'ایمیل یا رمز عبور اشتباه است.';
            else
                message = 'خطایی رخ داده است.';
            toast.error(message);
        })
    }

    return (
        <>
            <Header />
            <div className="main login-main">
                <p className="sign">ورود</p>
                <form onSubmit={login}>
                    <Input
                        className="inputText"
                        type="email"
                        value={email}
                        autoComplete="off"
                        placeholder="ایمیل"
                        required
                        onChange={setEmail}
                    />
                    <Input
                        className="inputText"
                        type="password"
                        value={password}
                        autoComplete="off"
                        placeholder="رمز عبور"
                        onChange={setPassword}
                    />
                    <div className="text-center">
                        <button type="submit" className="login-submit">ورود</button>
                    </div>
                </form>
                <div className="text-center">
                    <a href="https://github.com/login/oauth/authorize?client_id=17736afbe983a0754dd1&scope=user"><button type="submit" className="login-submit">احراز هویت با گیت هاب</button></a>
                </div>
                <br />
                <a className="signup" onClick={() => history.push('/signup')}>حساب نداربد؟ اینجا کلیک کنید</a>
                <br />
                <br />
            </div>
        </>
    );
}
