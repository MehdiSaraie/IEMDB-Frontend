import React, { useState } from "react";
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import * as ReactDOM from 'react-dom';
import "../../assets/css/login-signup.css";
import Header from "../Header";
import Signup from "./Signup";
import { useAuth } from '../../hooks/use-auth';
import Input from '../components/Input';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const auth = useAuth();

    function login(e) {
        e.preventDefault();

        auth.login(email, password).then(() => {
            toast.success('باموفقیت وارد شدید.');
            history.push('/');
        }).catch(() => {
            toast.error('ایمیل یا رمز عبور اشتباه است.');
        });
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
                <a className="signup" onClick={() => ReactDOM.render(<Signup/>, document.getElementById("root"))}>حساب نداربد؟ اینجا کلیک کنید</a>
                <br />
                <br />
            </div>
        </>
    );
}
