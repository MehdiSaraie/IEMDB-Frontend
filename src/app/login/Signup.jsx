import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../../assets/css/login-signup.css";
import Header from "../Header";
import Input from '../components/Input';
import { useAuth } from "../../hooks/use-auth";


export default function Signup() {
    const [name, setName] = useState('');
    const [nickname, setNickName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const auth = useAuth();

    function signup(e) {
        e.preventDefault();
        auth.signup(name, nickname, birthDate, email, password).then(() => {
            toast.success('باموفقیت ثبت‌نام شدید.');
            // history.goBack();
            history.push('/')
        }).catch((err) => {
            let message;
            if (err.response.status === 401)
                message = 'کاربر از قبل وجود دارد.'
            else
                message = 'خطایی رخ داده است.';
            toast.error(message);
        });
    }

    return (
        <div className='container'>
            <Header />
            <div className="main login-main">
                <p className="sign">ثبت نام</p>
                <form onSubmit={signup}>
                    <Input className="inputText" type="text" autoComplete="off" placeholder="نام" required onChange={setName} value={name}/>
                    <Input className="inputText" type="text" autoComplete="off" placeholder="نام مستعار" required onChange={setNickName} value={nickname}/>
                    <Input className="inputText" type="date" autoComplete="off" placeholder="تاریخ تولد" onChange={setBirthDate} value={birthDate}/>
                    <Input className="inputText" type="email" autoComplete="off" placeholder="ایمیل" required onChange={setEmail} value={email}/>
                    <Input className="inputText" type="password" autoComplete="off" placeholder="رمز عبور" required onChange={setPassword} value={password}/>
                    <div className="text-center">
                        <button type="submit" className="login-submit">ثبت نام</button>
                    </div>
                </form>
                <div className="text-center">
                    <a href="https://github.com/login/oauth/authorize?client_id=17736afbe983a0754dd1&scope=user"><button type="submit" className="login-submit">احراز هویت با گیت هاب</button></a>
                </div>
                <br />
                <a className="signup" onClick={() => history.push('/login')}>از اینجا وارد شوید</a>
                <br />
                <br />
            </div>
        </div>
    );
}
